import * as UTIL from '../util'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const FAILURE_FETCH_CATEGORIES = 'FAILURE_FETCH_CATEGORIES'

export function requestCategories() {
    return {
        type: REQUEST_CATEGORIES
    }
}

export function receiveCategories(json) {  
    return {
        type: RECEIVE_CATEGORIES,
        items: json.categories.map(item => item.name)
    }
}

export function failureFetchCategories() {
    return {
        type: FAILURE_FETCH_CATEGORIES
    }
}

export function fetchCategories() {
    return function (dispatch) {
        dispatch(requestCategories())
        return fetch(
            `${UTIL.URI}/categories`,
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
                    return dispatch(failureFetchCategories())
                }
                return dispatch(receiveCategories(json))
            })           
    }
}