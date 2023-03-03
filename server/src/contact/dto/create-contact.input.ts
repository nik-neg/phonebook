import * as GraphQLTypes from '../../graphql-types';
import { phoneNumbersTransform } from './transform/phoneNumbers.transform';
import { Transform } from 'class-transformer';

export class CreateContactInput extends GraphQLTypes.CreateContactInput {
  @Transform(phoneNumbersTransform)
  phoneNumbers: string[];
}
