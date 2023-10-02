import "./home.scss"

import LeftBar from "../../components/leftBar/LeftBar"
import Main from "../../components/main/Main"
import RightBar from "../../components/rightBar/RightBar"
import Profile from "../profile/Profile"
import CreatePost from "../../components/createPost/CreatePost"
import ShowPost from "../../components/showPost/ShowPost"

const Home = () => {
  return (
    <div className="home-container">
      {/* <div className="leftBar"> */}
      <LeftBar style={{overflowY: "scroll" }} />
      <div style={{display: "flex", flex: "6" }}>
        <Main />
        <RightBar />
      </div>



      {/* <Profile/> */}

      {/* <CreatePost/> */}
    </div>
  )
}

export default Home