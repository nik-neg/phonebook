import { SApp } from './App.styles';
import Dashboard from './components/Dashboard/Dashboard';

export const App = (): JSX.Element => {
    return (
        <SApp>
            <Dashboard />
        </SApp>
    );
};

export default App;
