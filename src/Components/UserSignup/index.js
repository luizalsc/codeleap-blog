import './index.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, loginStatus } from '../../actions'
import { Link } from 'react-router-dom'

function SignupComponent ({username}){
  
  const dispatch = useDispatch()

  const [profile, setProfile] = useState({})

  const [isDisabled, setIsDisabled] = useState(true)

  const handleInputChange = (event)=>{
    event.preventDefault()
    const value = event.target.value
    setProfile({...profile,[event.target.name]: value})
    setIsDisabled(false)
  }
  const handleSubmit = ()=>{
    dispatch(login(profile))
    dispatch(loginStatus(true)) 
  }

    return(
      <main className='main'>
        <div className='signup-container'>
          <h1 className='header'>Welcome to CodeLeap network!</h1>
          <form value={profile} role='form' onSubmit={handleSubmit} className='signup-form'>
            <label htmlFor='username' className='label'>Please enter your username</label>
            <input
              type='text'
              placeholder='John doe'
              name='username'
              value={username}
              onChange={handleInputChange}
              className='input-field'></input> 
            <Link to={`/posts`} className='link'>
                <button
                className='button'
                value={profile}
                type='submit'
                onClick={handleSubmit}
                disabled={isDisabled}>ENTER
                </button>
            </Link>
          </form>
        </div>
      </main>
    )
}

export { SignupComponent }