import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFilterImageInput, IQueryPaginationInput } from '../../api/types';
import { BASE_URL } from './types';
import { buildContactQuery } from '../../api/utils';
import { IContact } from '../../components/Dashboard/ContactsList/ContactCard';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
    endpoints: (builder) => ({
        getContacts: builder.query<any, IQueryPaginationInput>({
            query: (body) => ({
                url: '/graphql',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    query: `{
                        contacts(queryPaginationInput: {${buildContactQuery(
                            body
                        )}}) {
                            id
                            firstName
                            lastName
                            nickName
                            phoneNumbers {
                                id
                                phoneNumber
                            }
                            address
                            imageFile
                        }
                    }`,
                },
            }),
            providesTags: (result) =>
                result.data.contacts
                    ? [
                          ...result.data.contacts.map((contact: IContact) => ({
                              type: 'Contact' as const,
                              id: contact.id.toString(),
                          })),
                          { type: 'Contacts', id: 'LIST' },
                      ]
                    : [{ type: 'Contacts', id: 'LIST' }],
        }),
        removeContact: builder.mutation<any, number>({
            query: (id) => ({
                url: `/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    query: `mutation {
                      removeContact(id: ${id}) {
                        firstName,
                        lastName,
                      }
                    }`,
                },
            }),
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        updateContact: builder.mutation<
            IContact,
            { contact: IContact; filterImageInput: IFilterImageInput }
        >({
            query: ({ contact, filterImageInput }) => ({
                url: `/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    query: `mutation {
                      updateContact(id: ${contact.id}, updateContactInput: {
                        firstName: "${contact.firstName}"
                        lastName: "${contact.lastName}",
                        nickName: "${contact.nickName}",
                        phoneNumbers: "${contact.phoneNumbers}",
                        address: "${contact.address}",
                        imageFile: "${contact.imageFile}",
                        filter: {
                            blur: ${filterImageInput?.blur},
                            grayscale: ${filterImageInput?.grayscale},
                            saturation: ${filterImageInput?.saturation},  
                        }          
                      }) {
                        id,
                        firstName,
                        lastName,
                        nickName,
                        phoneNumbers {
                            id
                            phoneNumber
                        },
                        address,
                        imageFile
                      }
                    }`,
                },
            }),
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetContactsQuery,
    useLazyGetContactsQuery,
    useRemoveContactMutation,
    useUpdateContactMutation,
} = contactsApi;
