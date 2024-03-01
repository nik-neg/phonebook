import * as yup from 'yup';

export const registerLoginSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password file is required'),
});
