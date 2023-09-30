import "./login.scss"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import InstaHubName from "../../assets/instahub.png"
import InstaImageBg from "../../assets/home-phones-bg.png"
import ScreenShot1 from "../../assets/screenshot1.png"
import ScreenShot2 from "../../assets/screenshot2.png"
import ScreenShot3 from "../../assets/screenshot3.png"
import ScreenShot4 from "../../assets/screenshot4.png"
import PlayStore from "../../assets/playStore.png"
import MicrosoftStore from "../../assets/microsoftStore.png"
import Footer from "../../components/footer/Footer"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setToken } from "../../redux/slices/authSlice"
import { setUser } from "../../redux/slices/userSlice"
import { makeRequest } from "../../utils/makeRequest"

const screenshots = [ScreenShot1, ScreenShot2, ScreenShot3, ScreenShot4];

const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);

  const [inputs, setInputs] = useState({
    identifier: '',
    password: ""
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (index + 1) % screenshots.length;
      setIndex(nextIndex);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [index]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await makeRequest.post('/auth/login', inputs, {
        withCredentials: true,
      });

      const { token, user } = data;

      console.log("After login data: " + token);

      dispatch(setToken(token));
      dispatch(setUser(user));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/")
      toast.success(`${inputs.identifier} logged in`);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // other than 2xx, so you can handle specific error codes here.
        if (err.response.status === 404) {
          toast.error("User not found. Please check your credentials.");
        } else if (err.response.status === 401) {
          toast.error("Incorrect password. Please try again.");
        } else if (err.response.status === 400) {
          toast.error("An error occurred. Please check your connection.");
        }
      } else if (err.request) {
        // The request was made but no response was received (e.g., network error).
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an error.
        toast.error("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <>
      <div className="login-container">

        {/* Left */}
        <div className="left">
          <img className="bg-img" src={InstaImageBg} alt="" />
          <div>
            <img className="overlap-img" src={screenshots[index]} alt="" />
          </div>
        </div>

        {/* Right */}
        <div className="right">

          <div>
            <div className="brand-name">
              <img src={InstaHubName} alt="" />
            </div>
            <div className="form">
              <form action="" onSubmit={handleLogin}>
                <input
                  type="text"
                  name="identifier"
                  value={inputs.identifier}
                  placeholder="Username or Email"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
                <button className="btn-primary">Log in</button>
              </form>
            </div>
            <div className="forgotten-password">
              Forgotten your password?
            </div>
          </div>

          <div>
            Don't have an account? <Link className="link" to="/signup">Sign Up</Link>
          </div>

          <div>
            <p>Get the App</p>
            <p>
              <span><img className="store-link" src={PlayStore} alt="" /></span>
              <span><img className="store-link" src={MicrosoftStore} alt="" /></span>
            </p>
          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}

export default Login