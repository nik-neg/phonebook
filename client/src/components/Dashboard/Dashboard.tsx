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
import { SearchDialog } from './dialogs/SearchDialog/SearchDialog';
import { getContacts } from '../../api/ApiClient';

export const Dashboard = (): JSX.Element => {
    // add pagination fetch for infinite scroll, add loader animation, sort in the backend!
    const contacts: IContact[] = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'Coolio',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg',
        },
        {
            id: 2,
            firstName: 'John',
            lastName: 'LastNameVeryVeryLong',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            id: 3,
            firstName: 'John',
            lastName: 'NickName',
            address: '',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            id: 4,
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'NickName',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            imageFile:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            id: 5,
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

    console.log({ fetchedContacts });

    const onFetchContacts = (contacts: IContact[]) => {
        setFetchedContacts(contacts);
    };

    const onRemoveContact = (id: number) => {
        setFetchedContacts((prev) => prev.filter((c) => c.id !== id));
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

    const handleEditContact = (contact: IContact) => {
        setFetchedContacts((prev) => {
            const index = prev.findIndex((c) => c.id === contact.id);
            prev[index] = contact;
            return prev;
        });
    };

    const [openSearch, setOpenSearch] = useState(false);

    const handleOpenSearch = () => {
        setOpenSearch(true);
    };

    const handleSearchClose = () => {
        setOpenSearch(false);
    };

    const handleSearch = async (keyword: string) => {
        if (keyword.length < 3) return;
        // fetch contacts
        const contacts = await getContacts({
            keyword,
            page: 1,
        });

        setFetchedContacts(contacts?.data?.data?.contacts ?? []);
    };

    return (
        <SDashboardContainer>
            <SDashboardHeader />
            <SDashboardList>
                <ContactsList
                    contacts={fetchedContacts}
                    onFetchContacts={onFetchContacts}
                    onAddContact={handleAddContact}
                    onRemoveContact={onRemoveContact}
                    onEditContact={handleEditContact}
                    onOpenSearch={handleOpenSearch}
                />
            </SDashboardList>
            <AddDialog
                selectedValue={contact}
                open={open}
                onClose={handleClose}
                onEdit={handleAddContact}
            />
            <SearchDialog
                open={openSearch}
                onClose={handleSearchClose}
                onSearch={handleSearch}
            />
            <SDashboardFooter />
        </SDashboardContainer>
    );
};

export default Dashboard;
