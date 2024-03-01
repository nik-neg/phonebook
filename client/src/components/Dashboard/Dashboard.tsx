import {
    SDashboard,
    SDashboardContainer,
    SDashboardFooter,
    SDashboardHeader,
} from './Dashboard.styles';
import { IContact } from './ContactsList/ContactCard/types';
import React, { useState } from 'react';
import { ContactsList } from './ContactsList';
import { AddDialog } from './dialogs/AddDialog/AddDialog';
import { useLazyGetContactsQuery } from '../../store/api/contacts.api';
import { SearchDialog } from './dialogs/SearchDialog';
import { shouldActivate } from '../../utils';
import { ButtonPanel } from '../ButtonPanel/ButtonPanel';
import Tilt from 'react-parallax-tilt';

export const Dashboard = (): JSX.Element => {
    const [fetchedContacts, setFetchedContacts] = useState<IContact[]>([]);

    const onFetchContacts = (contacts: IContact[]) => {
        setFetchedContacts(contacts);
    };

    const onRemoveContact = (id: number) => {
        setFetchedContacts((prev) => prev.filter((c) => c.id !== id));
    };

    const [open, setOpen] = useState(false);

    const handleOpenAddContact = () => {
        setOpen(true);
    };

    const handleAddContact = (contact: IContact) => {
        setFetchedContacts((prev) => [...prev, contact]);
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

    const [getContacts] = useLazyGetContactsQuery();
    const handleSearch = async (keyword: string) => {
        if (!keyword || keyword.length >= 3) {
            try {
                const contacts = await getContacts({
                    keyword,
                    page: 1,
                });

                let newContacts = contacts?.data?.data?.getContacts.contacts;
                newContacts = newContacts?.length ? newContacts : [];

                setFetchedContacts(newContacts);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const [openSearch, setOpenSearch] = useState(false);

    const handleOpenSearch = () => {
        setOpenSearch(true);
    };

    const handleSearchClose = () => {
        setOpenSearch(false);
    };

    const [isDeviceOn, setIsDeviceOn] = useState(true);

    const [page, setPage] = useState(1);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    return (
        <Tilt>
            <SDashboardContainer>
                <SDashboardHeader />
                <SDashboard>
                    <ContactsList
                        isDeviceOn={isDeviceOn}
                        page={page}
                        contacts={fetchedContacts}
                        onPageChange={handlePageChange}
                        onFetchContacts={onFetchContacts}
                        onRemoveContact={onRemoveContact}
                        onEditContact={handleEditContact}
                        onHandleSearch={handleSearch}
                    />
                </SDashboard>

                <AddDialog
                    open={open}
                    onClose={handleClose}
                    onSave={handleAddContact}
                />
                {!shouldActivate(
                    import.meta.env.VITE_SEARCH_BAR_WITHOUT_BUTTON
                ) && (
                    <SearchDialog
                        open={openSearch}
                        onClose={handleSearchClose}
                        onSearch={handleSearch}
                    />
                )}

                <SDashboardFooter>
                    <ButtonPanel
                        isDeviceOn={isDeviceOn}
                        onAddContact={handleOpenAddContact}
                        onHandleSearch={handleSearch}
                        onFetchContacts={onFetchContacts}
                        toggleDevice={() => setIsDeviceOn(!isDeviceOn)}
                    />
                </SDashboardFooter>
            </SDashboardContainer>
        </Tilt>
    );
};

export default Dashboard;
