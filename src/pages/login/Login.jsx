import "./login.scss"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import InstaHubName from "../../assets/instahub.png"
import InstaImageBg from "../../assets/home-phones-bg.png"
import ScreenShot1 from "../../assets/screenshot1.png"
import ScreenShot2 from "../../assets/screenshot2.png"
import ScreenShot3 from "../../assets/screenshot3.png"
import ScreenShot4 from "../../assets/screenshot4.png"
import PlayStore from "../../assets/playStore.png"
import MicrosoftStore from "../../assets/microsoftStore.png"
import Footer from "../../components/footer/Footer"

const screenshots = [ScreenShot1, ScreenShot2, ScreenShot3, ScreenShot4];

const Login = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (index + 1) % screenshots.length;
      setIndex(nextIndex);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [index]);

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
              <form action="">
                <input type="text" placeholder="Username or Email" />
                <input type="password" placeholder="Password" />
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