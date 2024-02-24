import { FieldValues, Path, UseFormTrigger } from 'react-hook-form';

export const triggerValidation = async <T extends FieldValues>(
    trigger: UseFormTrigger<T>,
    fields: Path<T>[]
): Promise<boolean> => {
    const arr = [];
    for (const field of fields) {
        const result = await trigger(field);
        arr.push(result);
    }
    return arr.reduce((acc, curr) => acc && curr, true);
};
