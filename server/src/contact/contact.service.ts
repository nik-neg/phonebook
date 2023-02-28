import { Injectable } from '@nestjs/common';
import { PhoneNumber } from './entities/phone-number.entity/phone-number.entity';
import { Contact } from './entities/contact.entity/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateContactInput } from './dto/create-contact.input/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input/update-contact.input';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find({ relations: ['phoneNumbers'] });
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
      createContactInput.phoneNumbers.map((phoneNumber) =>
        this.preloadPhoneNumber(phoneNumber),
      ),
    );
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
    const contact = await this.contactRepository.preload({
      id,
      ...updateContactInput,
    });
    if (!contact) {
      throw new UserInputError(`Contact #${id} does not exist`);
    }
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<Contact> {
    const contact = await this.findOne(id);
    return this.contactRepository.remove(contact);
  }

  private async preloadPhoneNumber(phoneNumber: string): Promise<PhoneNumber> {
    const existingPhoneNumber = await this.phoneNumberRepository.findOne({
      where: { phoneNumber },
    });
    if (existingPhoneNumber) {
      return existingPhoneNumber;
    }
    return this.phoneNumberRepository.create({ phoneNumber });
  }
}
