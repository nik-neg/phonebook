import { Contact } from '../contact/entities/contact.entity/contact.entity';

export interface IFilterImage {
  id?: Contact['id'];

  imageFile?: Contact['imageFile'];
  blur: number;
  grayscale: boolean;
  saturation: number;
}
