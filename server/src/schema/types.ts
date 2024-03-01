export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  nickName?: string;
  phoneNumbers: string[];
  address: string;
  imageFile: string;
}
