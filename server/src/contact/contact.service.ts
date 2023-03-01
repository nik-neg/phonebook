import { Injectable } from '@nestjs/common';
import { PhoneNumber } from './entities/phone-number.entity/phone-number.entity';
import { Contact } from './entities/contact.entity/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateContactInput } from './dto/create-contact.input/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input/update-contact.input';
import { omit, uniq } from 'lodash';
import * as GraphQLTypes from '../graphql-types';
import { FetchContactsArgs } from './dto/fetch-contacts.input/fetch-contacts.input';

// https://docs.nestjs.com/techniques/validation#stripping-properties
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async findAll(
    args: FetchContactsArgs = { skip: 0, take: 5, keyword: '' },
  ): Promise<Contact[]> {
    const take = args.take || 10;
    const skip = args.skip || 0;
    const keyword = args.keyword || '';

    const searchObject = [
      { firstName: Like('%' + keyword + '%') },
      { lastName: Like('%' + keyword + '%') },
      { nickName: Like('%' + keyword + '%') },
      { address: Like('%' + keyword + '%') },
    ];

    const [result, total] = await this.contactRepository.findAndCount({
      where: searchObject,
      order: { lastName: 'DESC' },
      take: take,
      skip: skip,
    });
    return result;
    // return this.contactRepository.find({ relations: ['phoneNumbers'] });
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id },
      relations: ['phoneNumbers'],
    });
    if (!contact) {
      throw new UserInputError(`Contact #${id} does not exist`);
    }
    return contact;
  }

  async create(createContactInput: CreateContactInput): Promise<Contact> {
    const phoneNumbers = await Promise.all(
      uniq(createContactInput.phoneNumbers).map((phoneNumber) =>
        this.preloadPhoneNumber(phoneNumber),
      ),
    );
    // unique phone numbers
    const contact = this.contactRepository.create({
      ...createContactInput,
      phoneNumbers,
    });

    return this.contactRepository.save(contact);
  }

  async update(
    id: number,
    updateContactInput: UpdateContactInput,
  ): Promise<Contact> {
    let phoneNumbers = [];
    let contact;
    if (updateContactInput?.phoneNumbers?.length > 0) {
      phoneNumbers = await Promise.all(
        updateContactInput?.phoneNumbers?.map((phoneNumber) =>
          this.preloadPhoneNumber(phoneNumber),
        ),
      );
      contact = await this.contactRepository.update(
        {
          id,
        },
        { ...updateContactInput, phoneNumbers },
      );
    } else {
      contact = await this.contactRepository.update(
        {
          id,
        },
        { ...omit(updateContactInput, ['phoneNumbers']) },
      );
    }

    if (!contact) {
      throw new UserInputError(`Contact #${id} does not exist`);
    }
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<Contact> {
    const contact = await this.findOne(id);
    return this.contactRepository.remove(contact);
  }
  private async preloadPhoneNumber(
    phoneNumber: string,
  ): Promise<GraphQLTypes.PhoneNumber> {
    const existingPhoneNumber = await this.phoneNumberRepository.findOne({
      where: { phoneNumber },
    });
    if (existingPhoneNumber) {
      return existingPhoneNumber;
    }
    return this.phoneNumberRepository.create({ phoneNumber });
  }
}
