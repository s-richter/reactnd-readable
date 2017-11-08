import * as util from '../util'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const FAILURE_FETCH_COMMENTS = 'FAILURE_FETCH_COMMENTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'
export const UPDATE_COMMENT_PROP = 'UPDATE_COMMENT_PROP'

const headers = {
    Accept: 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json'
}

export function requestComments(postId) {
    return {
        type: REQUEST_COMMENTS,
        postId
    }
}

export function receiveComments(json) {
    return {
        type: RECEIVE_COMMENTS,
        items: [...json]
    }
}

export function failureFetchComments() {
    return {
        type: FAILURE_FETCH_COMMENTS
    }
}

export function fetchComments(postId) {
    return function (dispatch) {
        dispatch(requestComments(postId))
        return fetch(`${util.URI}/posts/${postId}/comments`,
            {
                headers: {
                    ...headers
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .catch((error) => {
                console.log(error)
                return null
            })
            .then(json => {
                if (!json) {
                    return dispatch(failureFetchComments())
                }
                return dispatch(receiveComments(json))
            })
    }
}

export function updateCommentSortMethod(sortMethod, sortDirection = util.defaultSortDirection) {
    return {
        type: SORT_COMMENTS,
        sortMethod,
        sortDirection
    }
}

export function applyVoteToComment(commentId, voteDirection) {
    return function (dispatch) {
        const option = voteDirection
        return fetch(`${util.URI}/comments/${commentId}`, {
            method: 'POST',
            headers: {
                ...headers
            },
            body: JSON.stringify({ option })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .catch((error) => {
                console.log(error)
                return null
            })
            .then(json => {
                if (voteDirection === util.VOTEDIRECTION.UP) {
                    dispatch(voteUpComment(commentId))
                } else if (voteDirection === util.VOTEDIRECTION.DOWN) {
                    dispatch(voteDownComment(commentId))
                }
            })
    }
}

export function voteUpComment(commentId) {
    return {
        type: VOTE_UP_COMMENT,
        commentId
    }
}

export function voteDownComment(commentId) {
    return {
        type: VOTE_DOWN_COMMENT,
        commentId
    }
}

export function saveChangesToComment(commentId, values) {
    // const author = values["author"]
    // const body = values["body"]
    return function (dispatch) {
        return fetch(`${util.URI}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                ...headers
            },
            body: JSON.stringify({ ...values })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .catch((error) => {
                console.log(error)
                return null
            })
            .then(json => {
                dispatch(updateCommentProp(commentId, values))
            })

    }
}

export function updateCommentProp(commentId, values) {
    return {
        type: UPDATE_COMMENT_PROP,
        commentId,
        values
    }
}