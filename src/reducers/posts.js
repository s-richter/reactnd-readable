import * as ACTIONS from '../actions'
import * as util from '../util'

export const posts = (
    state = {
        isFetching: false,
        sortMethod: util.defaultSortingCriteria,
        sortDirection: util.defaultSortDirection,
        items: []
    },
    action
) => {
    switch (action.type) {
        case ACTIONS.REQUEST_POSTS:
            return {
                ...state,
                isFetching: true
            }
        case ACTIONS.RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            }
        case ACTIONS.REQUEST_ALL_POSTS:
            return {
                ...state,
                isFetching: true
            }
        case ACTIONS.RECEIVE_ALL_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            }
        case ACTIONS.FAILURE_FETCH_POSTS:
            return {
                ...state,
                isFetching: false,
                items: []
            }
        case ACTIONS.REQUEST_POST_BY_ID:
            return {
                ...state,
                isFetching: true
            }
        case ACTIONS.RECEIVE_POST_BY_ID:
            return {
                ...state,
                isFetching: false,
                items: [
                    action.post
                ]
            }
        case ACTIONS.FAILURE_FETCH_POST_BY_ID:
            return {
                ...state,
                isFetching: false,
                items: [],
                failedToLoadPost: true
            }
        case ACTIONS.SORT_POSTS:
            return {
                ...state,
                sortMethod: action.sortMethod,
                sortDirection: action.sortDirection
            }
        default:
            return state
    }
}