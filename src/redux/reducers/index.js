import {
  LOGIN,
  LOGIN_STATUS,
  POSTS_LIST,
  SHOW_DELETE_MODAL,
  SHOW_EDIT_MODAL,
  OFFSET_NUMBER
} from '../../actions'
import { combineReducers } from "redux"

export function userReducer(state = {}, action){
  switch(action.type){
    case LOGIN: {
      return {...state, profile: action.payload}
    }
    
    case LOGIN_STATUS: {
      return {...state, status: action.payload}
    }
    default:
      return state
  }
}

export function postListReducer( state = [], action){
  switch(action.type){
    case POSTS_LIST: {
      return state.concat(action.payload)
    }
    default:
      return state
  }
}

export function editModalReducer( state = false, action){
  switch(action.type){
    case SHOW_EDIT_MODAL: {
      return action.payload
    }
    default:
      return state
  }
}

export function deleteModalReducer( state = false, action){
  switch(action.type){
    case SHOW_DELETE_MODAL: {
      return action.payload
    }
    default:
      return state
  }
}

export function offsetNumberReducer( state = 0, action){
  switch(action.type){
    case OFFSET_NUMBER: {
      return action.payload
    }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  user: userReducer,
  posts: postListReducer,
  editStatus: editModalReducer,
  deleteStatus: deleteModalReducer,
  offset: offsetNumberReducer
})

export default rootReducer
