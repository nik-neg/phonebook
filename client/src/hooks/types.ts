type CoordinateKeys = 'latitude' | 'longitude';
type Coordinate = Record<CoordinateKeys, number>;
export interface IPosition {
    coords: Coordinate;
}

export interface IError {
    code: number;
    message: string;
}
