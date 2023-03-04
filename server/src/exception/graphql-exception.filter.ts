import { ApolloError } from 'apollo-server-express';
import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(ApolloError)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: ApolloError) {
    const { message, extensions } = exception;
    const code = extensions?.code || 'INTERNAL_SERVER_ERROR';
    const errors = extensions?.exception?.errors || null;
    return { message, code, errors };
  }
}
