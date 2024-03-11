import { AuthService } from './auth.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types';
import { CreateOrReadUserInput } from '../graphql-types';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => GraphQLTypes.User, { name: 'getUser' })
  async findOne(
    @Args('createOrReadUserInput')
    createOrReadUserInput: CreateOrReadUserInput,
  ): Promise<GraphQLTypes.User> {
    return this.authService.signIn(createOrReadUserInput);
  }

  @Mutation('createUser')
  async create(
    @Args('createOrReadUserInput')
    createOrReadUserInput: CreateOrReadUserInput,
  ): Promise<GraphQLTypes.User> {
    return this.authService.register(createOrReadUserInput);
  }
}
