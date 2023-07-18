export const LOGIN = 'LOGIN'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const POSTS_LIST = 'POSTS_LIST'


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

export function setPostsList (post){
  return{
    type: POSTS_LIST,
    payload: post
  }
}
