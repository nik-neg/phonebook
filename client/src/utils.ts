export const shouldActivate = (value: string): boolean => {
    return (
        {
            true: true,
            false: false,
        }[value] ?? false
    );
};
