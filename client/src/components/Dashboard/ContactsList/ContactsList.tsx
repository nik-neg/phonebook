import {
    SContactListContainer,
    SContactListWrapper,
} from './ContactsList.styles';
import { IContactListProps } from './types';
import { ContactCard } from './ContactCard';

export const ContactsList = ({ contacts }: IContactListProps) => {
    const handleScroll = () => {
        console.log('scroll');
    };

    return (
        <SContactListContainer>
            <SContactListWrapper onScroll={handleScroll}>
                {contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))}
            </SContactListWrapper>
        </SContactListContainer>
    );
};

export default ContactsList;
