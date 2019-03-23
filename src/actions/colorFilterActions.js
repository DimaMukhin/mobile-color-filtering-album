import {
    SET_FIRST_COLOR_FILTER,
    SET_SECOND_COLOR_FILTER
} from './types';

export const setFirstColorFilter = firstColorFilter => ({
    type: SET_FIRST_COLOR_FILTER,
    payload: firstColorFilter
});

export const setSecondColorFilter = secondColorFilter => ({
    type: SET_SECOND_COLOR_FILTER,
    payload: secondColorFilter
});
