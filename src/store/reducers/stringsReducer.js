import {
    FETCH_STRINGS_BEGIN,
    FETCH_STRINGS_SUCCESS,
    FETCH_STRINGS_FAILURE,
    SET_STRINGS_ITEMS,
} from "../actions/stringsActions";

const initialState = {
    topFeatures: [],
    sentimentDistribution: {},
    sentences: [],
    top50Items: [],
    items: [],
    page: 1,
    pages: '',
    total: '',
    loading: false,
    error: null
};

export default function stringsReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_STRINGS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_STRINGS_SUCCESS:


            let total = action.payload.stringsData.sentences.length
            total = (total > 1000 && 1000) || total
            let pages = (total > 0) && Math.floor(total / 30)
            let items = action.payload.stringsData.sentences.slice(0, 30)
            let sortedFeatures = [...action.payload.stringsData.topFeatures];
            sortedFeatures.sort(function (a, b) {
                return b.count - a.count;
            });
            return {
                ...state,
                loading: false,
                topFeatures: sortedFeatures,
                sentimentDistribution: action.payload.stringsData.sentimentDistribution,
                sentences: action.payload.stringsData.sentences,
                items: items,
                pages: pages,
                total: total,
            };

        case FETCH_STRINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case SET_STRINGS_ITEMS:
            return {
                ...state,
                items: action.payload.stringsItems.items,
                page: action.payload.stringsItems.page,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}