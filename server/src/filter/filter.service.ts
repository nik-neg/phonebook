import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { IFilterImage } from './types';
import { ContactService } from '../contact/contact.service';
import * as sharp from 'sharp';

@Injectable()
export class FilterService {
  constructor(private readonly contactService: ContactService) {}

  async filterPreviewImage({
    imageFile,
    blur,
    grayscale,
    saturation,
  }: IFilterImage): Promise<string> {
    const base64Data = imageFile.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const output = await sharp(buffer).greyscale().toBuffer();
    return 'data:image/jpeg;base64,' + output.toString('base64');
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
