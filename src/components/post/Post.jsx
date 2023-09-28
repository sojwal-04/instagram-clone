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
import { formatDistanceToNow } from "date-fns"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { makeRequest } from "../../utils/makeRequest";

const Post = ({ post }) => {

  const navigate = useNavigate();

  const [color, setColor] = useState("black");
  const [like, setLike] = useState(null);
  const [openComment, setOpenComment] = useState(false);


  let timeStamp = formatDistanceToNow(new Date(post?.createdAt), {
    addSuffix: false, // Adds "ago" or "from now"
  });

  const handleLike = async () => {
    try {
      if (like !== null && like) {
        await makeRequest.delete();
      } else if (like !== null) {
        await makeRequest.post();
      }
      setLike(!like)
      toast.success(`${like ? "Unliked" : "Liked"} the post`)

    } catch (err) {
      console.log(err);
      toast.error(`Cannot ${like ? "unlike" : "like"} the post`)
    }
  }

  return (
    <div className="post-container">
      <div className="profile-details">
        <div className="left">
          <div className="profilePic">
            <img src={post?.user?.profilePic} alt="profilePic" />
          </div>
          <div className="username" onClick={() => navigate(`/${post?.user?.username}`)}>
            <div className=" reference-link username">
              {post?.user?.username}
            </div>
          </div>
          <div className="createdAt">
            {timeStamp}
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
            <div className="icon" onClick={handleLike}>
              <LikeIcon fill={color} color={`${color}`} />
            </div>
            <div className="icon" >
              <CommentIcon color={color} />
            </div>
            <div className="icon" >
              <ShareIcon color={color} />
            </div>
          </div>
          <div className="right">
            {/* <BookmarkBorderIcon /> */}
          </div>
        </div>

        <div className="likes-count">
          {`${post?.likes ?? 0} likes`}
        </div>

        <div className="comments-count">
          {
            post?.comments > 0 &&
            `View all ${post?.comments} comments`
          }
        </div>

        <input className="add-comment" placeholder="Add a comment..." />
      </div>

    </div>
  )
}

export default Post

