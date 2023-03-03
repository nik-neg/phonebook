import * as GraphQLTypes from '../../graphql-types';
import { phoneNumbersTransform } from './transform/phoneNumbers.transform';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactInput extends GraphQLTypes.CreateContactInput {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  nickName?: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  imageFile: string;

  @Transform(phoneNumbersTransform)
  @IsArray()
  @IsString({ each: true })
  phoneNumbers: string[];
}
