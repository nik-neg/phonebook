import { SApp } from './App.styles';
import Dashboard from './components/Dashboard/Dashboard';
import { WeatherProvider } from './provider';

export const App = (): JSX.Element => {
    return (
        <SApp>
            <WeatherProvider>
                <Dashboard />
            </WeatherProvider>
        </SApp>
    );
};

export default App;
