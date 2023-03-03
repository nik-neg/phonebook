import * as GraphQLTypes from '../../graphql-types';
import { Transform } from 'class-transformer';
import { phoneNumbersTransform } from './transform/phoneNumbers.transform';

export class UpdateContactInput extends GraphQLTypes.UpdateContactInput {
  @Transform(phoneNumbersTransform)
  phoneNumbers: string[];
  filter?: GraphQLTypes.FilterImageInput;
}
