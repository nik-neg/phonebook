import { IError } from './types';

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const errorLog = (err: IError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};

function getGeoLocation<T extends PositionCallback>(success: T) {
    navigator.geolocation.getCurrentPosition(success, errorLog, options);
}
export { getGeoLocation };
