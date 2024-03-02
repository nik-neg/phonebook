import { z } from 'zod';

export const addContactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    nickName: z.string().nullable(),
    phoneNumbers: z.string().min(4, 'Phone numbers are required'),
    address: z.string().min(1, 'Address is required'),
    imageFile: z.string().min(1, 'Image file is required'),
});
