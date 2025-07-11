import { IsOptional, IsString, IsHexColor, IsUrl} from 'class-validator';

export class CreateCustomizationDto {

  @IsString({ message: 'information debe ser una cadena de texto.' })
  @IsOptional()
  information?: string;

  @IsHexColor({ message: 'mainColors debe ser un color hexadecimal válido.' })
  @IsOptional()
  mainColors?: string;

  @IsHexColor({ message: 'navbarColor debe ser un color hexadecimal válido.' })
  @IsOptional()
  navbarColor?: string;

  @IsHexColor({ message: 'buttonColor debe ser un color hexadecimal válido.' })
  @IsOptional()
  buttonColor?: string;

  @IsHexColor({ message: 'backgroundColor debe ser un color hexadecimal válido.' })
  @IsOptional()
  backgroundColor?: string;

  @IsHexColor({ message: 'secondaryColor debe ser un color hexadecimal válido.' })
  @IsOptional()
  secondaryColor?: string;
}