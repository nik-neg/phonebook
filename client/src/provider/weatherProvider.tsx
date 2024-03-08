import { createContext, useContext, useState } from 'react';
import { IWeatherData, IWeatherDataContext, ProviderProps } from './types';

const WeatherContext = createContext<IWeatherDataContext>({
    weatherData: {},
    updateWeatherData: () => {},
});

export const WeatherProvider = ({ children }: ProviderProps) => {
    const [weatherData, setWeatherData] = useState<Partial<IWeatherData>>({});

    const updateWeatherData = (data: Partial<IWeatherData>) =>
        setWeatherData(data);

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                updateWeatherData,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => useContext(WeatherContext);
