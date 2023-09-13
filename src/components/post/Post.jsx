import "./post.scss"

// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from "../../assets/CommentIcon";
// import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import { FcLike } from "react-icons/fc"
import ShareIcon from "../../assets/ShareIcon";
import LikeIcon from "../../assets/LikeIcon";

const Post = ({ post }) => {

  const [color, setColor] = useState("black");

  const [like, setLike] = useState(false);

  const [openComment, setOpenComment] = useState(false);

  return (
    <div className="post-container">

      <div className="profile-details">
        <div className="left">
          <div className="profilePic">
            <img src={post?.profilePic} alt="profilePic" />
          </div>
          <div className="username">
            {post?.username}
          </div>
          <div className="createdAt">
            {post?.createdAt}
          </div>
        </div>
        <div className="right">
          <BsThreeDots />
        </div>
      </div>

      <div className="post-image">
        <img src={post?.imageUrl} alt="image" />
      </div>

      <div className="post-details">


        <div>
          <div className="left">
            <div>
              <LikeIcon className="icon" color={`${color}`} />
            </div>
            <div>
              <CommentIcon className="icon" color={color} />
            </div>
            <div>
              <ShareIcon className="icon" color={color} />
            </div>
          </div>
          <div className="right">
            {/* <BookmarkBorderIcon /> */}
          </div>
        </div>

        <div className="likes-count">
          {`${post?.likes} likes`}
        </div>

        <div className="comments-count">
          {
            post?.comments > 0 &&
            `View all ${post?.comments} comments`
          }
        </div>

        <div className="add-comment">
          Add a comment...
        </div>


      </div>

    </div>
  )
}

export default Post

