import day from '../assets/weather/day.svg';
import nightClear from '../assets/weather/night.svg';
import dayCloudy from '../assets/weather/cloudy-day-1.svg';
import nightCloudy from '../assets/weather/cloudy-night-1.svg';
import cloudy from '../assets/weather/cloudy.svg';
import rainyDay from '../assets/weather/rainy-1.svg';
import rainyNight from '../assets/weather/rainy-5.svg';
import veryRainyDay from '../assets/weather/rainy-7.svg';
import thunder from '../assets/weather/thunder.svg';
import snow from '../assets/weather/snowy-5.svg';
import fog from '../assets/weather/fog.svg';

type WeatherIconMapType = {
    [key: string]: string;
};
export const WeatherIconMap: WeatherIconMapType = {
    '01d': day,
    '01n': nightClear,
    '02d': dayCloudy,
    '02n': nightCloudy,
    '03d': cloudy,
    '03n': cloudy,
    '04d': cloudy,
    '04n': cloudy,
    '09d': veryRainyDay,
    '09n': veryRainyDay,
    '10d': rainyDay,
    '10n': rainyNight,
    '11d': thunder,
    '11n': thunder,
    '13d': snow,
    '13n': snow,
    '50d': fog,
    '50n': fog,
};
