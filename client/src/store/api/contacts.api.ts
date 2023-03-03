import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IQueryPaginationInput } from '../../api/types';
import { BASE_URL } from './types';
import { buildContactQuery } from '../../api/utils';

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
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContactsQuery } = contactsApi;
