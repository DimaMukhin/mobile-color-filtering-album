import { 
    SET_FIRST_COLOR_FILTER,
    SET_SECOND_COLOR_FILTER
} from '../actions/types';

const initialState = {
    firstColorFilter: null,
    secondColorFilter: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FIRST_COLOR_FILTER:
            return {
                ...state,
                firstColorFilter: action.payload
            };
        case SET_SECOND_COLOR_FILTER:
            return {
                ...state,
                secondColorFilter: action.payload
            };
        default:
            return state;
    }
}
