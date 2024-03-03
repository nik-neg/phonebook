import { IFilter } from '../../AddDialog';
import { IContact } from '../../../ContactsList/ContactCard';

export interface IImageFilterProps {
    imageFile: IContact['imageFile'];

    onFilter?: (filter: IFilter) => void;

    isFetchingImage?: boolean;
}
