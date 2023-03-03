import { Inject, Injectable } from '@nestjs/common';
import { PhoneNumber } from './entities/phone-number.entity/phone-number.entity';
import { Contact } from './entities/contact.entity/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { FetchContactsArgs } from './dto/fetch-contacts.input';
import { FilterService } from '../filter/filter.service';
import { CONTACTS_COUNT } from './constants';
import { omit } from 'lodash';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
    @Inject(FilterService)
    private readonly filterService: FilterService,
  ) {}

  async findAll(
    args: FetchContactsArgs = { skip: 0, take: 5, keyword: '', page: 1 },
  ): Promise<Contact[]> {
    const skip = (args.page - 1) * CONTACTS_COUNT;
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
      take: CONTACTS_COUNT,
      skip: skip,
      relations: ['phoneNumbers'],
    });
    return result;
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
    const parsedPhoneNumbers = createContactInput.phoneNumbers[0]
      .split(',')
      .map((phoneNumber) => phoneNumber.trim());

    const phoneNumbers = await Promise.all(
      parsedPhoneNumbers.map((phoneNumber) =>
        this.phoneNumberRepository.create({ phoneNumber }),
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

    let updatedContact;

    if (updateContactInput?.phoneNumbers?.length > 0) {
      const parsedPhoneNumbers = updateContactInput.phoneNumbers[0]
        .split(',')
        .map((phoneNumber) => phoneNumber.trim());

      const phoneNumbers = await Promise.all(
        parsedPhoneNumbers.map((phoneNumber) =>
          this.phoneNumberRepository.create({ phoneNumber }),
        ),
      );

      const oldPhoneNumbers = contact.phoneNumbers.filter(
        (entry) =>
          !phoneNumbers
            .map((entry) => entry.phoneNumber)
            .includes(entry.phoneNumber),
      );

      // Delete the old phone numbers
      const phoneNumbersToDeleteEntities =
        await this.phoneNumberRepository.find({
          where: {
            phoneNumber: In(
              oldPhoneNumbers.map((phoneNumber) => phoneNumber.phoneNumber),
            ),
            contact: contact,
          },
        });

      await this.phoneNumberRepository.remove(phoneNumbersToDeleteEntities);

      contact.phoneNumbers = phoneNumbers;
      await this.contactRepository.save(contact);

      updatedContact = await this.contactRepository.update(
        {
          id,
        },
        {
          ...omit(updateContactInput, ['phoneNumbers', 'filter']),
          imageFile,
        },
      );
    } else {
      updatedContact = await this.contactRepository.update(
        {
          id,
        },
        { ...omit(updateContactInput, ['phoneNumbers', 'filter']), imageFile },
      );
    }
    return this.contactRepository.save(updatedContact);
  }

  async remove(id: number): Promise<Contact> {
    const contactToDelete = await this.findOne(id);

    // Delete the associated phone numbers first
    await this.phoneNumberRepository.delete({ contact: contactToDelete });

    return this.contactRepository.remove(contactToDelete);
  }
}
