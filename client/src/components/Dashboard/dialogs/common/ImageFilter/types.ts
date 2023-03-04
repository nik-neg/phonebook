import { IFilter } from '../../AddDialog';
import { ContactWithPhoneNumbersAsString } from '../../UpdateDialog';

export interface IImageFilterProps {
    contact: Partial<ContactWithPhoneNumbersAsString>;

    onFilter?: (filter: IFilter) => void;

    isFetchingImage?: boolean;
}
