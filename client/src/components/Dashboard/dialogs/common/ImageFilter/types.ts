import { IFilter } from '../../AddDialog';
import { ContactWithPhoneNumbersAsStringWithoutId } from '../../UpdateDialog';

export interface IImageFilterProps {
    contact: ContactWithPhoneNumbersAsStringWithoutId;

    onFilter?: (filter: IFilter) => void;

    isFetchingImage?: boolean;
}
