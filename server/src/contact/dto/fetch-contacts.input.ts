import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

@ArgsType()
export class FetchContactsArgs extends GraphQLTypes.QueryPaginationInput {
  @Field(() => Int)
  @IsOptional()
  @Min(1)
  @Max(5)
  take? = 5;

  @Field(() => Int)
  @IsOptional()
  @Min(0)
  skip? = 0;

  @Field(() => String)
  @IsOptional()
  keyword?: string;

  @IsOptional()
  page?: number;
}
