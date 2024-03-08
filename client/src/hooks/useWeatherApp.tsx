import { useEffect } from 'react';
import { useWeather } from '../provider';
import { IPosition } from './types';
import { getGeoLocation } from './utils';

export const useWeatherApp = () => {
    const { updateWeatherData } = useWeather();

    const success: PositionCallback = async (pos: IPosition) => {
        const { latitude, longitude } = pos.coords;

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                    import.meta.env.VITE_WEATHER_API_KEY
                }&units=metric`
            );
            const weather = await res.json();
            updateWeatherData(weather);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getGeoLocation(success);
    }, []);
};
