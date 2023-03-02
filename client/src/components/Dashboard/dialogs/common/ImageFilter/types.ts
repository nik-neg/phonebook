import { IContact } from '../../../ContactsList/ContactCard/types';
import { IFilter } from '../../AddDialog';

export interface IImageFilterProps {
    contact: IContact;

    onFilter?: (filter: IFilter) => void;

    isFetchingImage?: boolean;
}
