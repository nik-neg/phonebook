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
    let output;
    const outputPrefix = 'data:image/png;base64,'; // 'data:image/jpeg;base64,'

    const base64Data = imageFile.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    if (blur) {
      output = await sharp(buffer).blur(blur).toBuffer();
    }

    if (saturation) {
      output = await sharp(output ?? buffer)
        .modulate({
          saturation,
        })
        .toBuffer();
    }

    if (grayscale) {
      output = await sharp(output ?? buffer)
        .greyscale()
        .toBuffer();
    }

    output = outputPrefix + output.toString('base64');
    return output ?? imageFile;
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
