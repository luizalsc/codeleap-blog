import {createStore} from 'redux'
import { combineReducers } from 'redux'
import { 
  userReducer,
  postListReducer,
  editModalReducer,
  deleteModalReducer
} from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postListReducer,
  editStatus: editModalReducer,
  deleteStatus: deleteModalReducer
})

const store = createStore(rootReducer)

export { store }