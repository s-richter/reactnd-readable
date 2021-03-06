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
                }, {
                    ...state,
                    isFetching: false,
                    items: {}
                }
            )
        case ACTIONS.FAILURE_FETCH_COMMENTS:
            return {
                ...state,
                isFetching: false,
                failedToLoadComments: true,
                items: {}
            }
        case ACTIONS.SORT_COMMENTS:
            return {
                ...state,
                sortMethod: action.sortMethod,
                sortDirection: action.sortDirection
            }
        case ACTIONS.VOTE_UP_COMMENT:
            return {
                ...state,
                items: {
                    ...state["items"],
                    [action.commentId]: {
                        ...state["items"][action.commentId],
                        voteScore: state["items"][action.commentId]["voteScore"] + 1
                    }
                }
            }
        case ACTIONS.VOTE_DOWN_COMMENT:
            return {
                ...state,
                items: {
                    ...state["items"],
                    [action.commentId]: {
                        ...state["items"][action.commentId],
                        voteScore: state["items"][action.commentId]["voteScore"] - 1
                    }
                }
            }
        case ACTIONS.UPDATE_COMMENT_PROP:
            return {
                ...state,
                items: {
                    ...state["items"],
                    [action.commentId]: {
                        ...state["items"][action.commentId],
                        ...action.values
                    }
                }
            }
        case ACTIONS.DELETE_COMMENT:
            return {
                ...state,
                items: {
                    ...state["items"],
                    [action.commentId]: {
                        ...state["items"][action.commentId],
                        deleted: true
                    }
                }
            }
        case ACTIONS.DELETE_POST:
            return Object.keys(state.items).reduce(
                (acc, val) => {
                    return {
                        ...acc,
                        items: {
                            ...acc["items"],
                            [val]: {
                                ...state["items"][val],
                                parentDeleted: true
                            }
                        }
                    }
                }, {
                    ...state
                }
            )
        default:
            return state
    }
}