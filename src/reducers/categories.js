import * as ACTIONS from '../actions'

export const categories = (
    state = {
        categoryColors: {
            "react": "#61DAFB",
            "redux": "#764ABC",
            "udacity": "#06ADDB"
        },
        isFetching: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case ACTIONS.REQUEST_CATEGORIES:
            return {
                ...state,
                isFetching: true,
                failedToLoadCategories: false
            }
        case ACTIONS.RECEIVE_CATEGORIES:
            return {
                ...state,
                isFetching: false,
                items: action.items,
                failedToLoadCategories: false
            }
            case ACTIONS.FAILURE_FETCH_CATEGORIES:
            return {
                ...state,
                isFetching: false,
                failedToLoadCategories: true,
                items: []
            }
        default:
            return state
    }
}