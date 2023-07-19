import {createStore} from 'redux'
import { combineReducers } from 'redux'
import { 
  userReducer,
  postListReducer,
  editModalReducer,
  deleteModalReducer,
  offsetNumberReducer
} from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postListReducer,
  editStatus: editModalReducer,
  deleteStatus: deleteModalReducer,
  offset: offsetNumberReducer
})

const store = createStore(rootReducer)

export { store }