import Posts from "../posts/Posts"
import Stories from "../stories/Stories"
import "./main.scss"

const Main = () => {
  return (
    <div className="main-container">
      <Stories/>
      <Posts/>
    </div>
  )
}

export default Main