import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginStatus } from '../../actions'
import { MainScreenPage } from '../../Pages/MainScreenPage'

function SignupComponent (){

  const user = useSelector((state)=>state.user)
 
  const dispatch = useDispatch()

  const [profile, setProfile] = useState({})

  const handleInputChange = (event)=>{
    event.preventDefault()
    const value = event.target.value
    setProfile({...profile,[event.target.name]: value})
  }
  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(login(profile))
  }

  if( user.profile === undefined || user.status === undefined){
    return(
      <main>
        <h1>Welcome to CodeLeap network!</h1>
        <form value={profile} role='loginform' onSubmit={handleSubmit}>
          <label htmlFor='username'>Please enter your username</label>
          <input
            type='text'
            placeholder='John doe'
            name='username'
            onChange={handleInputChange}></input> 
          <button
            type='submit'
            onClick={()=>{dispatch(loginStatus(true))}}>
              ENTER
          </button>
        </form>
      </main>
    )
  }else{ return <MainScreenPage /> }

  
}

export { SignupComponent }