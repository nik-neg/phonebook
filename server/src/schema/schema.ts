import SchemaBuilder from '@pothos/core';
import { IContact } from './types';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';

const builder = new SchemaBuilder({
  plugins: [SimpleObjectsPlugin],
  notStrict:
    'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
});

const Contact = builder.objectRef<IContact>('Contact');

const PhoneNumber = builder.simpleObject('ContactInfo', {
  fields: (t) => ({
    id: t.string({
      nullable: false,
    }),
    phoneNumber: t.string({
      nullable: false,
    }),
    contact: t.string({
      nullable: false,
    }),
  }),
});

Contact.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    nickName: t.exposeString('nickName', { nullable: true }),
    address: t.exposeString('address'),
    imageFile: t.exposeString('imageFile'),
    phoneNumbers: t.expose('phoneNumbers', {
      type: PhoneNumber,
      list: true,
      resolve: (parent) => {
        return parent.phoneNumbers.map((p) => {
          return {
            ...p,
            contact: parent.id,
          };
        });
      },
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    contact: t.field({
      args: {
        id: t.arg.string(),
      },
      type: Contact,
      // resolve: (parent, { id }) => `${id}`,
      resolve: (parent, { id }) => {
        return parent.findOne(+id).then((contact) => {
          return {
            ...contact,
            phoneNumbers: contact.phoneNumbers.map((p) => p.phoneNumber),
          };
        });
      },
    }),
  }),
});

export const schema = builder.toSchema();
