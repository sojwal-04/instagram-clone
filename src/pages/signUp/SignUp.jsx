import "./signUp.scss"

import { Link } from "react-router-dom"

import InstaHubName from "../../assets/instahub.png"
import PlayStore from "../../assets/playStore.png"
import MicrosoftStore from "../../assets/microsoftStore.png"
import Footer from "../../components/footer/Footer"


const SignUp = () => {
  return (
    <>
    <div className="signup-container">
      <div>
        <div className="brand-name">
          <img src={InstaHubName} alt="" />
        </div>
        <div className="form">
          <form action="">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <div className="terms-policy">
              <p>
                People who use our service may have uploaded your contact information to Instagram. <span> <Link className="link" to="https://www.facebook.com/help/instagram/261704639352628"> Learn more </Link></span>
              </p>
              <p>
                By signing up, you agree to our <span><Link className="link" to="">Terms, Privacy Policy and </Link></span> <span><Link className="link" to="">Cookies Policy</Link></span>.
              </p>
            </div>
            <button className="btn-primary">Sign up</button>
          </form>
        </div>
      </div>

      <div>
        Have an account? <Link className="link" to="/">Log in</Link>
      </div>

      <div>
        <p>Get the App</p>
        <p>
          <span><img className="store-link" src={PlayStore} alt="" /></span>
          <span><img className="store-link" src={MicrosoftStore} alt="" /></span>
        </p>
      </div>
    </div>

    <Footer/>
    </>
  )
}

export default SignUp