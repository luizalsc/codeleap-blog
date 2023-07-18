import {
  LOGIN,
  LOGIN_STATUS,
  POST_SUBMITION_CONTENT,
  
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
    case POST_SUBMITION_CONTENT: {
      return[...state, action.payload]
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
