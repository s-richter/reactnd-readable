import * as util from '../util'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS'
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const FAILURE_FETCH_POSTS = 'FAILURE_FETCH_POSTS'
export const REQUEST_POST_BY_ID = 'REQUEST_POST_BY_ID'
export const RECEIVE_POST_BY_ID = 'RECEIVE_POST_BY_ID'
export const FAILURE_FETCH_POST_BY_ID = 'FAILURE_FETCH_POST_BY_ID'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_UP_POST = 'VOTE_UP_POST'
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST'

const headers = {
    Accept: 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json'
}

export function requestPosts(category) {
    return {
        type: REQUEST_POSTS,
        category
    }
}

export function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        items: [...json]
    }
}

export function failureFetchPosts() {
    return {
        type: FAILURE_FETCH_POSTS
    }
}

export function fetchPosts(category) {
    return function (dispatch) {
        dispatch(requestPosts(category))
        return fetch(`${util.URI}/${category}/posts`,
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
                    return dispatch(failureFetchPosts())
                }
                return dispatch(receivePosts(json))
            })
    }
}

export function requestAllPosts() {
    return {
        type: REQUEST_ALL_POSTS
    }
}

export function receiveAllPosts(json) {
    return {
        type: RECEIVE_ALL_POSTS,
        items: [...json]
    }
}

export function fetchAllPosts() {
    return function (dispatch) {
        dispatch(requestAllPosts())
        return fetch(`${util.URI}/posts`,
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
                    return dispatch(failureFetchPosts())
                }
                return dispatch(receiveAllPosts(json))
            })
    }
}

export function requestPostById(id) {
    return {
        type: REQUEST_POST_BY_ID,
        id
    }
}

export function receivePostById(json) {
    return {
        type: RECEIVE_POST_BY_ID,
        post: { ...json }
    }
}

export function failureFetchPostById(id) {
    return {
        type: FAILURE_FETCH_POST_BY_ID,
        id
    }
}

export function fetchPostById(id) {
    return function (dispatch, getState) {
        dispatch(requestPostById(id))
        const store = getState()
        if (store
            && store.posts
            && store.posts.items
            && store.posts.items.length > 0) {
            // the store is populated with posts           
            const item = store.posts.items.find(item => item.id === id)
            if (item) {
                return Promise
                    .resolve(null)
                    .then(() => dispatch(receivePostById(item)))
                    .catch((err) => console.log(err))
            } else {
                return fetchPostFromStore(dispatch, id)
            }
        } else {
            fetchPostFromStore(dispatch, id)
        }
    }
}

// this function intentionally does not get exported
function fetchPostFromStore(dispatch, id) {
    return fetch(
        `${util.URI}/posts/${id}`,
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
                return dispatch(failureFetchPostById(id))
            }
            return dispatch(receivePostById(json))
        })
}

export function updatePostSortMethod(sortMethod, sortDirection = util.defaultSortDirection) {
    return {
        type: SORT_POSTS,
        sortMethod,
        sortDirection
    }
}

export function applyVoteToPost(postId, voteDirection) {
    return function (dispatch) {
        const option = voteDirection
        return fetch(`${util.URI}/posts/${postId}`, {
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
                    dispatch(voteUpPost(postId))
                } else if (voteDirection === util.VOTEDIRECTION.DOWN) {
                    dispatch(voteDownPost(postId))
                }
            })
    }
}

export function voteUpPost(postId) {
    return {
        type: VOTE_UP_POST,
        postId
    }
}

export function voteDownPost(postId) {
    return {
        type: VOTE_DOWN_POST,
        postId
    }
}
