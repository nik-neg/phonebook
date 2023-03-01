import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import * as GraphQLTypes from '../../../graphql-types';

@ArgsType()
export class FetchContactsArgs extends GraphQLTypes.QueryPaginationInput {
  @Field(() => Int)
  @Min(1)
  @Max(5)
  take = 5;

  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => String)
  keyword: string;
}
