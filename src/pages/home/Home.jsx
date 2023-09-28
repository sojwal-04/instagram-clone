import "./home.scss"

import LeftBar from "../../components/leftBar/LeftBar"
import Main from "../../components/main/Main"
import RightBar from "../../components/rightBar/RightBar"
import Profile from "../profile/Profile"
import CreatePost from "../../components/createPost/CreatePost"
import ShowPost from "../../components/showPost/ShowPost"

const Home = () => {
  return (
    <div className="container home-container">
      <LeftBar />

      <Main />
      <RightBar />

      {/* <ShowPost /> */}


      {/* <Profile/> */}

      {/* <CreatePost/> */}
    </div>
  )
}

export default Home