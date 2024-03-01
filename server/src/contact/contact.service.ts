import { Inject, Injectable } from '@nestjs/common';
import { PhoneNumber } from './entities/phone-number.entity/phone-number.entity';
import { Contact } from './entities/contact.entity/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { FetchContactsArgs } from './dto/fetch-contacts.input';
import { FilterService } from '../filter/filter.service';
import { CONTACTS_COUNT } from './constants';
import { omit } from 'lodash';
import * as GraphQLTypes from '../graphql-types';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository?: Repository<Contact>,
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository?: Repository<PhoneNumber>,
    @Inject(FilterService)
    private readonly filterService?: FilterService,

    private readonly connection?: Connection,
  ) {}

  async findAll(
    args: FetchContactsArgs = { skip: 0, take: 5, keyword: '', page: 1 },
  ): Promise<GraphQLTypes.ContactsResponse> {
    const skip = (args.page - 1) * CONTACTS_COUNT;
    const keyword = args.keyword || '';

    const searchObject = [
      { firstName: Like('%' + keyword + '%') },
      { lastName: Like('%' + keyword + '%') },
      { nickName: Like('%' + keyword + '%') },
      { address: Like('%' + keyword + '%') },
    ];

    try {
      const [result, total] = await this.contactRepository.findAndCount({
        where: searchObject,
        order: { lastName: 'DESC' },
        take: CONTACTS_COUNT,
        skip: skip,
        relations: ['phoneNumbers'],
      });
      return { contacts: result, total };
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: number): Promise<Contact> {
    try {
      const contact = await this.contactRepository.findOne({
        where: { id },
        relations: ['phoneNumbers'],
      });
      if (!contact) {
        throw new UserInputError(`Contact #${id} does not exist`);
      }

      return contact;
    } catch (e) {
      console.log(e);
    }
  }

  async create(createContactInput: CreateContactInput): Promise<Contact> {
    const parsedPhoneNumbers = createContactInput.phoneNumbers[0]
      .split(',')
      .map((phoneNumber) => phoneNumber.trim());

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const phoneNumbers = await Promise.all(
        parsedPhoneNumbers.map((phoneNumber) =>
          this.phoneNumberRepository.create({ phoneNumber }),
        ),
      );
      let contact = this.contactRepository.create({
        ...createContactInput,
        phoneNumbers,
      });

      contact = await queryRunner.manager.save(contact);
      await queryRunner.commitTransaction();

      return contact;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    updateContactInput: UpdateContactInput,
  ): Promise<Contact> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // filter image
      const imageFile =
        updateContactInput.filter &&
        (await this.filterService.filterImage({
          ...updateContactInput.filter,
          imageFile: updateContactInput.imageFile,
        }));

      const contact = await this.contactRepository.findOne({
        where: { id },
        relations: ['phoneNumbers'],
      });

      if (updateContactInput?.phoneNumbers?.length > 0) {
        const parsedPhoneNumbers = updateContactInput.phoneNumbers[0]
          .split(',')
          .map((phoneNumber) => phoneNumber.trim());

        const removedPhoneNumbers = contact.phoneNumbers;
        await this.phoneNumberRepository.remove(removedPhoneNumbers);

        const newPhoneNumbers = await Promise.all(
          parsedPhoneNumbers.map((phoneNumber) =>
            this.phoneNumberRepository.create({ phoneNumber }),
          ),
        );
        contact.phoneNumbers = newPhoneNumbers;
        await queryRunner.manager.save(contact);
      }
      await queryRunner.manager.update(
        Contact,
        { id },
        {
          ...omit(updateContactInput, ['phoneNumbers', 'filter']),
          imageFile,
        },
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return this.contactRepository.findOne({
      where: { id },
      relations: ['phoneNumbers'],
    });
  }

  async remove(id: number): Promise<Contact> {
    const queryRunner = await this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let contactToDelete = await this.findOne(id);

      const phoneNumbers = await this.phoneNumberRepository.find({
        where: { contact: contactToDelete },
      });
      await queryRunner.manager.remove(phoneNumbers);

      contactToDelete = await queryRunner.manager.remove(contactToDelete);
      await queryRunner.commitTransaction();

      return contactToDelete;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
