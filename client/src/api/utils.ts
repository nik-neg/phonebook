import { IQueryPaginationInput } from './types';

export const buildContactQuery = (queryInput: IQueryPaginationInput) => {
    const { take, keyword, page, skip } = queryInput;
    let queryString = '';

    if (page) {
        queryString += `page: ${page}`;
    }
    // else if (take && lastName) {
    //     queryString += ` contacts(firstName: "${firstName}", lastName: "${lastName}")`;
    // }

    // queryString +=
    //     ' { id firstName lastName nickName phoneNumbers { id phoneNumber } address imageFile } }';

    return queryString;
};
