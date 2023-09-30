import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import UserHome from './pages/userHome/UserHome'
// import Home from './pages/home/Home'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
// import Profile from './pages/profile/Profile'


function App() {

  // const Layout = () => {

  // }

  return (
    <>
      <div>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/:username"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

      </div>

    </>
  )
}

export default App
