export const LOGIN = 'LOGIN'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const POST_SUBMITION_CONTENT = 'POST_SUBMITION_CONTENT'


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

export function postSubmtionContent (post){
  return{
    type: POST_SUBMITION_CONTENT,
    payload: post
  }
}
