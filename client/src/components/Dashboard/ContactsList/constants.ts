export const CONTACTS_PER_PAGE = 4;
export const START_SCROLL = 0;
export const SCROLL_UP_STEP = 1;
export const SCROLL_DOWN_STEP = 2;
export const SHINE_TIME_REFERENCE = 5;
export const SHINE_TIME_COEFFICIENT = 50;

/**
 * The gradient color coefficient map is used to calculate the next color of the gradient
 * 1 = 255 = 100%
 * values of the next gradient colors are calculated as a percentage of the previous color
 * background: linear-gradient(
 *                to right,
 *                rgba(255, 255, 255, 0) 0%,
 *                rgba(255, 255, 255, 0.8) 50%,
 *                rgba(128, 186, 232, 0) 99%,
 *                rgba(125, 185, 232, 0) 100%
 *           );
 */
export const GRADIENT_COLOR_COEFFICIENT_MAP = [
    [1, 1, 1],
    [1, 1, 1],
    [255 / 128, 255 / 186, 255 / 232],
    [128 / 125, 186 / 185, 1],
];
