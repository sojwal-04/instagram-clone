import "./signUp.scss"

import { Link, useNavigate } from "react-router-dom"
import InstaHubName from "../../assets/instahub.png"
import PlayStore from "../../assets/playStore.png"
import MicrosoftStore from "../../assets/microsoftStore.png"
import Footer from "../../components/footer/Footer"
import { useState } from "react"
import toast from "react-hot-toast"
import { makeRequest } from "../../utils/makeRequest"

const SignUp = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the username field
    if (name === 'username') {
      const validUsername = /^[a-z][a-z0-9]{0,19}$/;
      if (!validUsername.test(value)) {
        toast.error('Username must start with a letter, contain only lowercase letters and numbers, and have a maximum length of 20 characters.');
      }
    }

    setInputs((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {

    console.log("I am inside a form");
    console.log(inputs);
    e.preventDefault();
    try {

      const { data } = await makeRequest.post("/auth/signup", inputs);

      console.log("Data: " + JSON.stringify(data));


      if (data?.success) {
        setTimeout(() => {
          navigate(`/login`);
        }, 2000);
        toast.success(data.message);
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      setError(err);
      toast.error("Error while signing up")
    }
  }


  return (
    <>
      <div className="signup-container">
        <div>
          <div className="brand-name">
            <img src={InstaHubName} alt="" />
          </div>
          <div className="form">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={inputs.email}
                placeholder="Email"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="name"
                value={inputs.name}
                placeholder="Full Name"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="username"
                value={inputs.username}
                placeholder="Username"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                name="password"
                value={inputs.password}
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                name="confirmPassword"
                value={inputs.confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e)}
              />
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
          Have an account? <Link className="link" to="/login">Log in</Link>
        </div>

        <div>
          <p>Get the App</p>
          <p>
            <span><img className="store-link" src={PlayStore} alt="" /></span>
            <span><img className="store-link" src={MicrosoftStore} alt="" /></span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default SignUp