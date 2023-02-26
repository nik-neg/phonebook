import {
    SDashboardContainer,
    SDashboardFooter,
    SDashboardHeader,
    SDashboardList,
    SDashboardTitle,
} from './Dashboard.styles';
import ContactsList from './ContactsList/ContactsList';

export const Dashboard = () => {
    return (
        <SDashboardContainer>
            <SDashboardHeader />
            <SDashboardTitle>Welcome</SDashboardTitle>
            <SDashboardList>
                <ContactsList />
            </SDashboardList>
            <SDashboardFooter />
        </SDashboardContainer>
    );
};

export default Dashboard;
