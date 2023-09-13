import { useState } from "react"
import Story from "../story/Story"
import "./stories.scss"
import { FlashOnTwoTone } from "@mui/icons-material"
import stories from "../../storiesData"

const Stories = () => {
  const [loading, setLoading] = useState(FlashOnTwoTone)
  // const data = 
  return (
    <div className="stories-container">
      <Story />
      {
        stories?.map(story => (<Story key={story.id} story={story} />))
      }
    </div>
  )
}

export default Stories