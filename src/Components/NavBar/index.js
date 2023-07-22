import './index.css'
import { Link } from 'react-router-dom'

const Navbar = ()=>{  
  return(
    <Link to='/' className='navbar-link'>
      <div className='navbar'>
        <h2>CodeLeap Network</h2>
      </div>
    </Link>
    )
}

export { Navbar }