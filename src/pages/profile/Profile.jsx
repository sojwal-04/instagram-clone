import "./profile.scss"
import { posts } from "../../data"
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentIcon from "../../assets/CommentIcon";

const Profile = ({ user }) => {

  user = {
    username: `sojwal._`,
    posts: 89,
    following: 190,
    followers: 290,
    name: "Sojwal",
    userBio: "Attitude is Everything",
    likes: 100,
    comments: 34
  }

  return (
    <div className="profile-container">

      <div className="user">
        <div className="left">
          <div className="profilePic">
            <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1594779152.1686824772&semt=ais" alt="" />
          </div>
        </div>
        <div className="right">
          <div className="user-details">
            <div className="username">{user?.username}</div>
            <div className="edit">Edit</div>
          </div>

          <div className="user-status">
            <div>{`${user?.posts} posts`}</div>
            <div>{`${user?.followers} followers`}</div>
            <div>{`${user?.following} following`}</div>
          </div>

          <div className="name">{user?.name}</div>

          <div className="user-bio">{user?.userBio} </div>
        </div>
      </div>

      <hr />

      <div className="profile-posts">

        {
          posts?.map(post => {
            return (
              <div key={post?.id} className="post">
                <img src={post?.imageUrl} alt="" />
                <div className="post-info">
                  <div id="likes"> <FavoriteRoundedIcon /> {`${post?.likes} `} </div>
                  <div id="comments">  <CommentIcon color={"white"} fill={"red"} /> {`${post?.comments} `}</div>
                </div>
              </div>
            )
          })
        }

      </div>

    </div>
  )
}

export default Profile