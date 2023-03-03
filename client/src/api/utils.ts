import { IQueryPaginationInput } from './types';

export const buildContactQuery = (queryInput: IQueryPaginationInput) => {
    const { take, keyword, page, skip } = queryInput;
    let queryString = '';

    if (page) {
        queryString += `page: ${page}`;
    }
    if (page && keyword) {
        queryString += `, keyword: "${keyword}"`;
    }

    return queryString;
};
