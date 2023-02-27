import {SDashboardContainer, SDashboardFooter, SDashboardHeader, SDashboardList,} from './Dashboard.styles';
import {IContact} from './ContactsList/ContactCard/types';
import React, {useState} from 'react';
import {DummyContact} from "./data";
import {ContactsList} from "./ContactsList";

export const Dashboard = (): JSX.Element => {
    // add pagination fetch for infinite scroll, add loader animation, sort in the backend!
    const contacts: IContact[] = [
        {
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'Coolio',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            photo: 'https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg',
        },
        {
            firstName: 'John',
            lastName: 'LastName',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            photo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            firstName: 'John',
            lastName: '',
            address: '',
            phoneNumbers: [],
            photo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'NickName',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            photo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
            firstName: 'John',
            lastName: 'LastName',
            nickName: 'NickName',
            address: '123, adksljfsjad',
            phoneNumbers: [],
            photo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        DummyContact,
    ];

    const [open, setOpen] = useState(false);

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
            <SDashboardHeader/>
            <SDashboardList>
                <ContactsList contacts={contacts}/>
            </SDashboardList>
            {/*<AddDialog*/}
            {/*    selectedValue={null}*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    onEdit={handleAddContact}*/}
            {/*/>*/}
            <SDashboardFooter/>
        </SDashboardContainer>
    );
};

export default Dashboard;
