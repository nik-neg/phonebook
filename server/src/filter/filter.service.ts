import { Injectable } from '@nestjs/common';
import { IFilterImage } from './types';
import * as sharp from 'sharp';

@Injectable()
export class FilterService {
  async filterImage({
    imageFile,
    blur,
    grayscale,
    saturation,
  }: IFilterImage): Promise<string> {
    let output;
    const outputPrefix = 'data:image/png;base64,';

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

    return output ? outputPrefix + output?.toString('base64') : imageFile;
  }
}
