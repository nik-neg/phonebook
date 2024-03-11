import * as GraphQLTypes from '../../../graphql-types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhoneNumber } from '../phone-number.entity/phone-number.entity';
import { User } from '../../../user/entities/user.entity';

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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  phoneNumbers: PhoneNumber[];

  @Column()
  address: string;

  @Column({ type: 'text', nullable: false })
  imageFile: string;

  @ManyToOne((type) => User, (user) => user.contacts)
  user: User;
}
