import {
    SAddButton,
    SAddButtonWrapper,
    SDashboardContainer,
    SDashboardFooter,
    SDashboardHeader,
    SDashboardList,
    SDashboardTitle,
    SIconWrapper,
} from './Dashboard.styles';
import ContactsList from './ContactsList/ContactsList';
import { IContact } from './ContactsList/ContactCard/types';
import { IoPersonAdd } from 'react-icons/all';
import { DummyContact } from './data';

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

    const handleAddContact = () => {
        console.log('add contact');
    };

    // <Hidden mdDown>
    return (
        <SDashboardContainer>
            <SDashboardHeader />
            <SDashboardTitle>Welcome</SDashboardTitle>
            <SDashboardList>
                <ContactsList contacts={contacts} />
                <SAddButtonWrapper>
                    {' '}
                    <SAddButton onClick={handleAddContact}>
                        {'Add Contact'}
                        <SIconWrapper>
                            <IoPersonAdd />
                        </SIconWrapper>
                    </SAddButton>
                </SAddButtonWrapper>
            </SDashboardList>

            <SDashboardFooter />
        </SDashboardContainer>
    );
};

export default Dashboard;
