export const LOGIN = 'LOGIN'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const POSTS_LIST = 'POSTS_LIST'
export const SHOW_EDIT_MODAL = 'SHOW_EDIT_MODAL'
export const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL'
export const OFFSET_NUMBER = 'OFFSET_NUMBER'


export function login (profile){
  return{
    type: LOGIN,
    payload: profile
  }
}
export function loginStatus (status){
  return{
    type: LOGIN_STATUS,
    payload: status
  }
}

export function setPostsList (posts){
  return{
    type: POSTS_LIST,
    payload: posts
  }
}

export function showEditModal (status){
  return{
    type: SHOW_EDIT_MODAL,
    payload: status
  }
}

export function showDeleteModal (status){
  return{
    type: SHOW_DELETE_MODAL,
    payload: status
  }
}

export function setOffsetNumber (number){
  return{
    type: OFFSET_NUMBER,
    payload: number
  }
}
