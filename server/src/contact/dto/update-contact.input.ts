import * as GraphQLTypes from '../../graphql-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  // @IsOptional()
  // @Transform(phoneNumbersTransform) // should work in general, code tested, could be an issue
  // @IsArray()
  // @IsString({ each: true })
  phoneNumbers: string[];

  @IsOptional()
  filter?: GraphQLTypes.FilterImageInput;
}
