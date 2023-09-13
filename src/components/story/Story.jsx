import "./story.scss"

const Story = ({story}) => {
  return (
    <div className="story-container">
      <div className="story-image">
        <img src={story?.imageUrl} alt="" />
      </div>
      <div className="story-username">
        {story?.username}
      </div>
    </div>
  )
}

export default Story