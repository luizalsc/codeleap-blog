import {createStore} from 'redux'
import { combineReducers } from 'redux'
import { userReducer, postListReducer } from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postListReducer
})

const store = createStore(rootReducer)

export { store }