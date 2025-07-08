import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '../user/user.entity';
import { Agency } from '../agency/agency.entity';
import {
  CreateRegisterDto,
  createUserAndAgencyDto,
  createUserAndAgencyWithGoogleDto,
} from './create-register.dto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto, GoogleLoginDto } from './create-login.dto';
import { DataSource } from 'typeorm';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { Role } from 'src/Enum/roles.enum';
import { NodeMailerService } from '../node-mailer/node-mailer.service';
import { config as dotenvconfig } from 'dotenv';
import { userPayload } from './update-register.dto';
import { Customization } from '../customization/customization.entity';
dotenvconfig({ path: '.env.development' });
@Injectable()
export class AuthService {
  private readonly logger: Logger;
  private readonly client: OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly agencyService: AgencyService,
    private jwtService: JwtService,
    private readonly mailService: NodeMailerService,
    private readonly dataSource: DataSource,
  ) {
    this.logger = new Logger(AuthService.name);
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async registerUserAndAgency(data: createUserAndAgencyDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        agencyName,
        agencyDescription,
        document,
        email,
        name,
        surname,
        password,
        phone,
        slug,
      } = data;

      // Para verificar si el usuario ya existe
      const existingUser = await queryRunner.manager.findOne(User, {
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException('El usuario ya existe');
      }

      // Para verificar si ya existe una agencia y con el mismo slug
      const existsAgency = await queryRunner.manager.findOne(Agency, {
        where: { slug },
      });

      if (existsAgency) {
        throw new ConflictException(`Agencia con slug '${slug}' ya existe`);
      }

      // Hasheamos la contraena
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Creamos y guardamos el usuario
      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      user.name = name;
      user.surname = surname;
      user.phone = phone;

      await queryRunner.manager.save(user);

      // Creamos y guardamos la agencia
      const agency = new Agency();
      agency.name = agencyName;
      agency.description = agencyDescription;
      agency.document = document;
      agency.slug = slug;
      agency.user = user;

      await queryRunner.manager.save(agency);

      const customization = await queryRunner.manager.getRepository(Customization).create()
      const savedCustomization = await queryRunner.manager.save(customization)
      agency.customization = savedCustomization
      await queryRunner.manager.update(Agency, agency.id, agency)
      // Si todo sale bien, hacemos commit
      await queryRunner.commitTransaction();

      // Para los datos actualizados
      const reNewUser = await this.userService.findOneByEmail(email);
      const { token, user: userToSend } = this.signJWT(reNewUser!);

      await this.mailService
        .sendMailRegistered(email, name, surname)
        .catch((error) => console.error('Error al enviar correo:', error));

      return { token, user: userToSend };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async registerUserAndAgencyWithGoogle(
    registerDto: createUserAndAgencyWithGoogleDto,
  ) {
    const {
      agencyName,
      agencyDescription,
      document,
      email,
      name,
      surname,
      password,
      phone,
      slug,
      token,
    } = registerDto;

    let existsUser: User | null;
    try {
      existsUser = await this.userService.findOneByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        existsUser = null;
      } else {
        throw new InternalServerErrorException('Error al buscar el usuario');
      }
    }

    if (existsUser) {
      throw new ConflictException('Usuario con este email ya existe');
    }
    const user = await this.registerGoogle({
      name,
      surname,
      phone,
      email,
      password,
      token,
    });
    await this.agencyService.create({
      name: agencyName,
      description: agencyDescription,
      document,
      agentUser: user.user.id,
      slug,
    });

    const reNewUser = await this.userService.findOneByEmail(email);
    const { token: payloadToSend, user: userToSend } = this.signJWT(reNewUser!);
    await this.mailService.sendMailRegistered(email, name, surname);
    return { token: payloadToSend, user: userToSend };
  }

  async registerGoogle(registerGoogleDto: {
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    token: string;
  }) {
    const { token } = registerGoogleDto;

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userService.createFromGoogle({
      ...registerGoogleDto,
      googleId: payload.sub,
      rol: Role.User,
    });
    return { user };
  }

  async register(registerDto: CreateRegisterDto): Promise<{ user: User }> {
    let existingUser: User | null = null;
    try {
      existingUser = await this.userService.findOneByEmail(registerDto.email);

      if (existingUser) {
        this.logger.warn(
          `Registro fallido: Usuario con email ${registerDto.email} ya existe.`,
        );
        throw new ConflictException('Usuario con este email ya existe');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        existingUser = null;
      } else {
        this.logger.warn(`Registro fallido: Error al buscar el usuario.`);
        throw new InternalServerErrorException('Error al buscar el usuario');
      }
    }

    try {
      const user = await this.userService.create({
        ...registerDto,
        rol: Role.User,
      });
      this.logger.log(
        `Registro exitoso para email: ${user.email}. Transaccion completada.`,
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword as User,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      this.logger.error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.stack,
      );

      throw new InternalServerErrorException('Registro fallido');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    this.logger.log(`Buscando user con email: ${email}`);
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      this.logger.debug(`User encontrado con email: ${email}`);
    } else {
      this.logger.debug(`No se encontro user con email: ${email}`);
    }
    return user;
  }
  async findOrCreateByGoogleId(payload: TokenPayload): Promise<User> {
    const googleId = payload.sub;
    try {
      const existingUser = await this.userService.findOneByGoogleId(googleId);
      if (existingUser) {
        existingUser.email = payload.email!;
        existingUser.name = payload.name!;
        existingUser.surname = payload.family_name!;

        await this.userService.update(existingUser.id, existingUser);
        return existingUser;
      } else {
        //debe registrarse con google
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      this.logger.error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Registro fallido para email: ${payload.email}. Transaccion revertida. Error: ${error.message}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.stack,
      );
      throw new InternalServerErrorException('Registro fallido');
    }
  }

  async login(createLoginDto: CreateLoginDto): Promise<{
    token: string;
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
      isAdmin: boolean;
    };
  }> {
    this.logger.log(`Verificando login para email: ${createLoginDto.email}`);
    const user = await this.findUserByEmail(createLoginDto.email);
    const messageError = 'Correo o contraseña incorrectos';
    if (!user) {
      this.logger.warn(`Login fallo para email: ${createLoginDto.email}`);
      throw new UnauthorizedException(messageError);
    }
    if (!user.password) {
      this.logger.warn(
        `Login fallo: contrasena invalida de email: ${createLoginDto.email}`,
      );
      throw new BadRequestException(
        'Usuario registrado con google, inicie sesion con google',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      createLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn(
        `Login fallo: contrasena invalida de email: ${createLoginDto.email}`,
      );
      throw new UnauthorizedException(messageError);
    }
    const { token, user: userToSend } = this.signJWT(user);
    return { token, user: userToSend };
  }
  async tokenSignin(token: GoogleLoginDto) {
    const res = await this.verify(token.token);
    return res;
  }

  async getDataFromToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Token de google invalido');
    }
    return payload;
  }
  private async verify(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Token de google invalido');
    }
    const user = await this.findOrCreateByGoogleId(payload);
    const { token: payloadToSend, user: userToSend } = this.signJWT(user);

    return { token: payloadToSend, user: userToSend };
  }

  private signJWT(user: User) {
    const payload: userPayload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isAdmin: user.isAdmin,
      agencyId: user.agency?.id,
      onBoarding: user.agency?.onBoarding,
      status: user.agency?.suscription?.status,
      suscriptionId: user.agency?.suscription?.suscriptionId,
    };
    const token = this.jwtService.sign(payload);
    return { token, user: payload };
  }
  async refreshSession(userId: string) {
    const user = await this.userService.findOneWithAllRelations(userId);
    const { token, user: userToSend } = this.signJWT(user);
    return { token, user: userToSend };
  }
}
