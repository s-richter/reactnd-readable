import * as ACTIONS from '../actions'

export const categories = (
    state = {
        isFetching: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case ACTIONS.REQUEST_CATEGORIES:
            return {
                ...state,
                isFetching: true
            }
        case ACTIONS.RECEIVE_CATEGORIES:
            return {
                ...state,
                isFetching: false,
                items: action.items
            }
        default:
            return state
    }
}