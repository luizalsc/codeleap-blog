import {
  LOGIN,
  LOGIN_STATUS,
  POSTS_LIST,
  
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
      return action.payload
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  posts: postListReducer
})

export default rootReducer
