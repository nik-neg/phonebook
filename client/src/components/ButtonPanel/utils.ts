export const parseColor = (color: string): number[] => {
    // rgb(255, 255, 255) -> [255, 255, 255]
    return color
        .substring(4, color.length - 1)
        .split(', ')
        .map((value) => parseInt(value, 10));
};
