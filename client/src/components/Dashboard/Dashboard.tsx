import {
    SDashboardContainer,
    SDashboardFooter,
    SDashboardHeader,
    SDashboardList,
} from './Dashboard.styles';
import { IContact } from './ContactsList/ContactCard/types';
import React, { useState } from 'react';
import { DummyContact } from './data';
import { ContactsList } from './ContactsList';
import { AddDialog } from './dialogs/AddDialog/AddDialog';

export const Dashboard = (): JSX.Element => {
    // add pagination fetch for infinite scroll, add loader animation, sort in the backend!
    const contacts: IContact[] = [
        {
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'Coolio',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg',
        },
        {
            firstName: 'John',
            lastName: 'LastNameVeryVeryLong',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            firstName: 'John',
            lastName: 'NickName',
            address: '',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'NickName',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'NickName',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        DummyContact,
    ];

    const [fetchedContacts, setFetchedContacts] = useState<IContact[]>([]);

    const onFetchContacts = (contacts: IContact[]) => {
        setFetchedContacts(contacts);
    };

    const [open, setOpen] = useState(false);

    const [contact, setContact] = useState<IContact>();

    const handleAddContact = () => {
        setOpen(true);
        console.log('add contact');
    };

    const handleClose = () => {
        setOpen(false);
    };

    // <Hidden mdDown>
    return (
        <SDashboardContainer>
            <SDashboardHeader />
            <SDashboardList>
                <ContactsList
                    contacts={contacts}
                    onFetchContacts={onFetchContacts}
                    onAddContact={handleAddContact}
                />
            </SDashboardList>
            <AddDialog
                selectedValue={contact}
                open={open}
                onClose={handleClose}
                onEdit={handleAddContact}
            />
            <SDashboardFooter />
        </SDashboardContainer>
    );
};

export default Dashboard;
