export const parsePhoneNumberArrayString = (
  phoneNumbers: string[],
): string[] => {
  return phoneNumbers[0].split(',').map((phoneNumber) => phoneNumber.trim());
};
