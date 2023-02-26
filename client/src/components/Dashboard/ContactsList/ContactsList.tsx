import { SContactListWrapper } from './ContactsList.styles';
import { IContactListProps } from './types';
import { ContactCard } from './ContactCard';

export const ContactsList = ({ contacts }: IContactListProps) => {
    return (
        <SContactListWrapper>
            {contacts.map((contact, index) => (
                <ContactCard key={index} contact={contact} />
            ))}
        </SContactListWrapper>
    );
};

export default ContactsList;
