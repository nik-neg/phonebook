import * as yup from 'yup';

export const addContactSchema = {
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    nickName: yup.string().nullable(),
    phoneNumbers: yup.string().required('Phone numbers are required'),
    address: yup.string().required('Address is required'),
    imageFile: yup.string().required('Image file is required'),
};
