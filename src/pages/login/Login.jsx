import "./login.scss"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

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

const screenshots = [ScreenShot1, ScreenShot2, ScreenShot3, ScreenShot4];

//LACKS LOGIN FUNCTIONLITY


const Login = () => {

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

  const handleSubmit = async (e) => {
    try {

      const res = await axios.post("http://localhost:8001/api/v1/users/login", inputs)

      if(res?.data?.success) {
        console.log("User logged in successfully");
        toast.success(res.data.message)
      }else {
        console.log("Login failed");
        toast.error(res.data.message)
      }

    } catch (err) {
      console.log("Error while logging in : ", err);
      setError(err);
      toast.error(error)
    }
  }

  console.log(inputs);

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
              <form action="" onSubmit={handleSubmit}>
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
            Don't have an account? <Link className="link" to="/accounts/emailsignup">Sign Up</Link>
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