import * as GraphQLTypes from '../../../graphql-types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhoneNumber } from '../phone-number.entity/phone-number.entity';

@Entity()
export class Contact extends GraphQLTypes.Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  nickName?: string;

  @OneToMany((type) => PhoneNumber, (phoneNumber) => phoneNumber.contact, {
    cascade: true,
  })
  phoneNumbers: PhoneNumber[];

  @Column()
  address: string;

  @Column({ type: 'bytea', nullable: false })
  imageFile: string;
}
