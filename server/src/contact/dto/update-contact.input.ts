import * as GraphQLTypes from '../../graphql-types';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { phoneNumbersTransform } from './transform/phoneNumbers.transform';

export class UpdateContactInput extends GraphQLTypes.UpdateContactInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  nickName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageFile?: string;

  @IsOptional()
  @Transform(phoneNumbersTransform)
  @IsArray()
  @IsString({ each: true })
  phoneNumbers: string[];

  @IsOptional()
  filter?: GraphQLTypes.FilterImageInput;
}
