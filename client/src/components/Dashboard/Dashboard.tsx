import {
    SDashboardContainer,
    SDashboardFooter,
    SDashboardHeader,
    SDashboardList,
    SDashboardTitle,
} from './Dashboard.styles';
import ContactsList from './ContactsList/ContactsList';
import { IContact } from './ContactsList/ContactCard/types';

export const Dashboard = () => {
    const contacts: IContact[] = [
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
            lastName: '',
            address: '',
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
            lastName: '',
            address: '',
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
            lastName: '',
            address: '',
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
            lastName: '',
            address: '',
            phoneNumbers: [],
            photo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
    ];
    return (
        <SDashboardContainer>
            <SDashboardHeader />
            <SDashboardTitle>Welcome</SDashboardTitle>
            <SDashboardList>
                <ContactsList contacts={contacts} />
            </SDashboardList>
            <SDashboardFooter />
        </SDashboardContainer>
    );
};

export default Dashboard;
