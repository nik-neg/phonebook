import * as yup from 'yup';

export const updateSchema = {
    firstName: yup.string().nullable(),
    lastName: yup.string().nullable(),
    nickName: yup.string().nullable(),
    phoneNumbers: yup.string().nullable(),
    address: yup.string().nullable(),
    imageFile: yup.string().nullable(),
};
