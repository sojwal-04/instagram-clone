import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import UserHome from './pages/userHome/UserHome'
import Home from './pages/home/Home'
// import Profile from './pages/profile/Profile'


function App() {

  return (
    <>
      <div>
        <Routes>

          <Route path="/users/login" element={<Login />} />
          <Route path="/users" element={<SignUp />} />
          <Route path="/users/:userId" element={<UserHome/>}/>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/" element={<Profile/>}/> */}
        </Routes>

      </div>

    </>
  )
}

export default App
