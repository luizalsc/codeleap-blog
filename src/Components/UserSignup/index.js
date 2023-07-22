import './index.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, loginStatus } from '../../actions'
import { Link } from 'react-router-dom'

function SignupComponent (){
  
  const dispatch = useDispatch()

  const [profile, setProfile] = useState({})

  const handleInputChange = (event)=>{
    event.preventDefault()
    const value = event.target.value
    setProfile({...profile,[event.target.name]: value})
  }
  const handleSubmit = ()=>{
    dispatch(login(profile))
    dispatch(loginStatus(true))
  }

    return(
      <main className='main'>
        <div className='signup-container'>
          <h1 className='header'>Welcome to CodeLeap network!</h1>
          <div value={profile} role='loginform' onSubmit={handleSubmit} className='signup-form'>
            <label htmlFor='username' className='label'>Please enter your username</label>
            <input
              type='text'
              placeholder='John doe'
              name='username'
              onChange={handleInputChange}
              className='input-field'></input> 
            <Link to={`/posts`}>
              <div>
                <button
                className='button'
                value={profile}
                type='submit'
                onClick={handleSubmit}>ENTER
                </button>
              </div>
            </Link>
          </div>
        </div>
      </main>
    )
}

export { SignupComponent }