import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import * as GraphQLTypes from '../graphql-types';
import { ParseIntPipe } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { FetchContactsArgs } from './dto/fetch-contacts.input';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query('getContacts')
  async findAll(
    @Args('queryPaginationInput')
    queryPaginationInput: FetchContactsArgs,
  ): Promise<GraphQLTypes.ContactsResponse> {
    return this.contactService.findAll(queryPaginationInput);
  }

  @Query(() => GraphQLTypes.Contact, { name: 'getContact' })
  async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Contact> {
    return this.contactService.findOne(id);
  }

  @Mutation('createContact')
  async create(
    @Args('createContactInput')
    createContactInput: CreateContactInput,
  ): Promise<GraphQLTypes.Contact> {
    return this.contactService.create(createContactInput);
  }

  @Mutation('updateContact')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
  ): Promise<GraphQLTypes.Contact> {
    return this.contactService.update(id, updateContactInput);
  }

  @Mutation('removeContact')
  async remove(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Contact> {
    return this.contactService.remove(id);
  }
}
