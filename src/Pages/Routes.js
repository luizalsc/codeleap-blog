import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupPage } from './SignupPage'
import { MainScreenPage } from './MainScreenPage'


function AppRoutes (){
  
    return(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path='/' element={<SignupPage />}/>
          <Route exact path='/posts' element={<MainScreenPage />}/>
        </Routes>
      </BrowserRouter>
    )

}

export { AppRoutes }