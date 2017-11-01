import { combineReducers } from 'redux'
import { posts } from './posts'
import { categories } from './categories'
import { comments } from './comments'

const appReducer = combineReducers({
    categories,
    posts,
    comments
})

export default appReducer