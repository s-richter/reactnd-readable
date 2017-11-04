import * as ACTIONS from '../actions'
import * as util from '../util'

export const comments = (
    state = {
        isFetching: false,
        sortMethod: util.defaultSortingCriteria,
        sortDirection: util.defaultSortDirection,
        items: {}
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
            return action.items.reduce(
                (acc, val) => {
                    return {
                        ...acc,
                        items: {
                            ...acc.items,
                            [val.id]: val
                        }
                    }
                }, { ...state, isFetching: false }
            )
        // return {
        //     ...state,
        //     isFetching: false,
        //     items: action.items
        // }
        case ACTIONS.FAILURE_FETCH_COMMENTS:
            return {
                ...state,
                isFetching: false,
                items: {}
            }
        case ACTIONS.SORT_COMMENTS:
            return {
                ...state,
                sortMethod: action.sortMethod,
                sortDirection: action.sortDirection
            }
        default:
            return state
    }
}