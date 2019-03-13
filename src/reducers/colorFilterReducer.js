import { SET_FIRST_COLOR_FILTER } from '../actions/types';

const initialState = {
    firstColorFilter: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FIRST_COLOR_FILTER:
            return {
                ...state,
                firstColorFilter: action.payload
            };
        default:
            return state;
    }
}
