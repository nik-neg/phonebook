import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../contact/entities/contact.entity/contact.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { IFilterImage } from './types';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async filterPreviewImage({
    imageFile,
    blur,
    grayscale,
    saturation,
  }: IFilterImage): Promise<string> {
    return '';
  }
  async filterExistingImage({
    id,
    blur,
    grayscale,
    saturation,
  }: IFilterImage): Promise<string> {
    const contact = await this.contactRepository.findOne({
      where: { id },
    });
    if (!contact) {
      throw new UserInputError(`Contact #${id} does not exist`);
    }

    return '';
  }
}
