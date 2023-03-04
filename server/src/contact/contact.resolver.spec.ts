import { Test } from '@nestjs/testing';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { FetchContactsArgs } from './dto/fetch-contacts.input';

describe('ContactResolver', () => {
  let resolver: ContactResolver;
  let service: ContactService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ContactResolver,
        {
          provide: ContactService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = moduleRef.get<ContactResolver>(ContactResolver);
    service = moduleRef.get<ContactService>(ContactService);
  });

  describe('findAll', () => {
    it('should call ContactService.findAll with the correct arguments', async () => {
      const queryPaginationInput: FetchContactsArgs = {
        /* test data */
      };
      await resolver.findAll(queryPaginationInput);
      expect(service.findAll).toHaveBeenCalledWith(queryPaginationInput);
    });
  });

  describe('findOne', () => {
    it('should call ContactService.findOne with the correct arguments', async () => {
      const id = 1;
      await resolver.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should call ContactService.create with the correct arguments', async () => {
      const createContactInput: CreateContactInput = {
        firstName: 'John',
        lastName: 'Doe',
        nickName: 'Johnny',
        address: '123 Main St',
        imageFile: 'https://www.example.com/image.jpg',
        phoneNumbers: ['123-456-7890', '098-765-4321'],
        /* test data */
      };
      await resolver.create(createContactInput);
      expect(service.create).toHaveBeenCalledWith(createContactInput);
    });
  });

  describe('update', () => {
    it('should call ContactService.update with the correct arguments', async () => {
      const id = 1;
      const updateContactInput: UpdateContactInput = {
        firstName: 'John',
        lastName: 'Doe',
        nickName: 'Johnny',
        address: '123 Main St',
        imageFile: 'https://www.example.com/image.jpg',
        phoneNumbers: ['123-456-7890', '098-765-4321'],
        filter: {
          grayscale: true,
          blur: 5,
          saturation: 30,
        },
        /* test data */
      };
      await resolver.update(id, updateContactInput);
      expect(service.update).toHaveBeenCalledWith(id, updateContactInput);
    });
  });

  describe('remove', () => {
    it('should call ContactService.remove with the correct arguments', async () => {
      const id = 1;
      await resolver.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
