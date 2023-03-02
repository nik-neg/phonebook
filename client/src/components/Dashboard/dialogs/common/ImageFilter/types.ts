import { IFilter } from '../../AddDialog';
import { ContactWithPhoneNumbersAsString } from '../../UpdateDialog';

export interface IImageFilterProps {
    contact: ContactWithPhoneNumbersAsString;

    onFilter?: (filter: IFilter) => void;

    isFetchingImage?: boolean;
}
