import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Agency } from 'src/modules/agency/agency.entity';
import { Status } from 'src/Enum/status.enum';
import { Type } from 'src/Enum/type.enum';
import { TypeOfProperty } from 'src/modules/typeOfProperty/typeofproperty.entity';
import { Images } from 'src/modules/images/image.entity';
import { SoftDeletableEntity } from 'src/Helpers/softDelete.entity';

@Entity('Property')
export class Property extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Status,
    enumName: 'property_status_enum',
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Type,
    enumName: 'property_type_enum',
  })
  type: Type;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  price: number;

  @Column()
  m2: number;

  @Column()
  bathrooms: number;

  @Column()
  description: string;

  @Column()
  rooms: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Images, (image) => image.property)
  images: Images[];

  @ManyToOne(() => TypeOfProperty, (type) => type.property, {
    nullable: true,
    onDelete: 'SET NULL',
  }) // Relacion con la tabla de tipo de propiedad
  @JoinColumn({ name: 'type_of_property_id' })
  type_of_property: TypeOfProperty;

  @ManyToOne(() => Agency, (agency) => agency.properties, {
    nullable: true,
    onDelete: 'SET NULL',
  }) // Relacion con la tabla de agencia
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

}
