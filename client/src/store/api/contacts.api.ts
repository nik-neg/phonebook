import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFilterImageInput, IQueryPaginationInput } from '../../api/types';
import { buildContactQuery } from '../../api/utils';
import { IContact } from '../../components/Dashboard/ContactsList/ContactCard';
import { ContactWithPhoneNumbersAsString } from '../../components/Dashboard/dialogs/UpdateDialog';
import { BASE_URL } from './constants';
import { uniqBy } from 'lodash-es';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    tagTypes: ['Contacts', 'Contact'],
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
                        getContacts(queryPaginationInput: {${buildContactQuery(
                            body
                        )}}) {
                            contacts {
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
                            },
                            total,
                        }
                    }`,
                },
            }),
            transformResponse: (response: any, meta, arg) =>
                response.data.getContacts.contacts,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (newItems.length) {
                    return uniqBy([...currentCache, ...newItems], 'id');
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: (data) => {
                return data
                    ? [
                          ...data?.map((contact: IContact) => ({
                              type: 'Contact' as const,
                              id: contact.id.toString(),
                          })),
                          { type: 'Contacts', id: 'LIST' },
                      ]
                    : [{ type: 'Contacts', id: 'LIST' }];
            },
        }),
        searchContacts: builder.query<any, IQueryPaginationInput>({
            query: (body) => ({
                url: '/graphql',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    query: `{
                        getContacts(queryPaginationInput: {${buildContactQuery(
                            body
                        )}}) {
                            contacts {
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
                            },
                            total,
                        }
                    }`,
                },
            }),
            transformResponse: (response: any, meta, arg) =>
                response.data.getContacts.contacts,
            providesTags: (data) => {
                return data
                    ? [
                          ...data?.map((contact: IContact) => ({
                              type: 'Contact' as const,
                              id: contact.id.toString(),
                          })),
                          { type: 'Contacts', id: 'LIST' },
                      ]
                    : [{ type: 'Contacts', id: 'LIST' }];
            },
        }),
        getContact: builder.query<any, IContact['id']>({
            query: (id) => ({
                url: `/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    query: `{
                      getContact(id: ${id}) {
                        firstName,
                        lastName,
                      }
                    }`,
                },
            }),
            providesTags: (result, error, id) => [{ type: 'Contact', id }],
        }),
        removeContact: builder.mutation<any, IContact['id']>({
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
            any,
            {
                contact: ContactWithPhoneNumbersAsString;
                filterImageInput: IFilterImageInput;
            }
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
            async onQueryStarted(
                { contact, ...patch },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    contactsApi.util.updateQueryData(
                        'getContact',
                        contact.id,
                        (draft) => {
                            Object.assign(draft, patch);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },
            invalidatesTags: (result, error, { contact }) => [
                { type: 'Contact', id: contact.id },
            ],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetContactsQuery,
    useLazySearchContactsQuery,
    useRemoveContactMutation,
    useGetContactQuery,
    useUpdateContactMutation,
} = contactsApi;
