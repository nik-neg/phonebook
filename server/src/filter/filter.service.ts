import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { IFilterImage } from './types';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class FilterService {
  constructor(private readonly contactService: ContactService) {}

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
    const contact = await this.contactService.findOne(id);
    if (!contact) {
      throw new UserInputError(`Contact #${id} does not exist`);
    }

    return '';
  }
}
