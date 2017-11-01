import * as ACTIONS from '../actions'

export const comments = (
    state = {
        isFetching: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case ACTIONS.REQUEST_COMMENTS:
            return {
                ...state,
                isFetching: true
            }
        case ACTIONS.RECEIVE_COMMENTS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            }
        case ACTIONS.FAILURE_FETCH_COMMENTS:
            return {
                ...state,
                isFetching: false,
                items: []
            }
        default:
            return state
    }
}