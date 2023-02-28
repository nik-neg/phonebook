import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import * as GraphQLTypes from '../graphql-types';
import { ParseIntPipe } from '@nestjs/common';
import { Contact } from './entities/contact.entity/contact.entity';
import { CreateContactInput } from './dto/create-contact.input/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input/update-contact.input';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query('contacts')
  async findAll(): Promise<GraphQLTypes.Contact[]> {
    return this.contactService.findAll();
  }

  @Query(() => GraphQLTypes.Contact, { name: 'contact' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
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
  async remove(@Args('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.remove(id);
  }
}
