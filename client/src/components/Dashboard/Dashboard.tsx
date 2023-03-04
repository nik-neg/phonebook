import {
    SDashboardContainer,
    SDashboardFooter,
    SDashboardHeader,
    SDashboardList,
} from './Dashboard.styles';
import { IContact } from './ContactsList/ContactCard/types';
import React, { useState } from 'react';
import { ContactsList } from './ContactsList';
import { AddDialog } from './dialogs/AddDialog/AddDialog';
import { SearchDialog } from './dialogs/SearchDialog/SearchDialog';
import { useLazyGetContactsQuery } from '../../store/api/contacts.api';

export const Dashboard = (): JSX.Element => {
    const [fetchedContacts, setFetchedContacts] = useState<IContact[]>([]);

    const onFetchContacts = (contacts: IContact[]) => {
        console.log('contacts', contacts);
        setFetchedContacts(contacts);
    };

    const onRemoveContact = (id: number) => {
        setFetchedContacts((prev) => prev.filter((c) => c.id !== id));
    };

    const [open, setOpen] = useState(false);

    const handleAddContact = () => {
        setOpen(true);
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

    const [getContacts] = useLazyGetContactsQuery();
    const handleSearch = async (keyword: string) => {
        if (keyword.length < 3) return;
        setFetchedContacts([]);
        // fetch contacts
        const contacts = await getContacts({
            keyword,
            page: 1,
        });

        setFetchedContacts(contacts?.data?.data?.getContacts.contacts ?? []);
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
