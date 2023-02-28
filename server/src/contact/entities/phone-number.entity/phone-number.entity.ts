import * as GraphQLTypes from '../../../graphql-types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from '../contact.entity/contact.entity';

@Entity()
export class PhoneNumber extends GraphQLTypes.PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @ManyToOne((type) => PhoneNumber, (phoneNumber) => phoneNumber.contact)
  contact: Contact;
}
