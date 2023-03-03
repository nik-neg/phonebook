import * as GraphQLTypes from '../../graphql-types';
import { Transform } from 'class-transformer';
import { phoneNumbersTransform } from './transform/phoneNumbers.transform';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsNotEmpty()
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
