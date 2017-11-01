import * as UTIL from '../util'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const FAILURE_FETCH_COMMENTS = 'FAILURE_FETCH_COMMENTS'

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
        return fetch(`${UTIL.URI}/posts/${postId}/comments`,
            {
                headers: { 'Authorization': 'because' }
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