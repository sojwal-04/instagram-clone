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
import { useSelector } from "react-redux";
import axios from "axios";

const Post = ({ post }) => {

  const user = useSelector(state => state.user.user)

  const navigate = useNavigate();

  const [color, setColor] = useState("black");
  const [like, setLike] = useState(false);
  const [openComment, setOpenComment] = useState(false);


  let timeStamp = formatDistanceToNow(new Date(post?.createdAt), {
    addSuffix: false, // Adds "ago" or "from now"
  });

  const handleLike = async () => {
    try {
      // Check if the post is already liked
      const isLiked = like;
  
      // Determine the action based on the current like status
      if (isLiked) {
        // If already liked, unlike the post;
        console.log("Trying to unlike post");
        await makeRequest.delete(`/likes/unlike?postIdToUnlike=${post?._id}&unlikedBy=${user?._id}`);
       
        console.log("Unliked");
      } else {
        // If not liked, like the post
        console.log("Trying to like post");
        await makeRequest.post(`/likes/like?postIdToLike=${post?._id}&likedBy=${user?._id}`);
        console.log("Liked");
      }
  
      // Toggle the like state
      setLike(!isLiked);
  
      // Show a success toast message
      toast.success(`${isLiked ? "Unliked" : "Liked"} the post`);
    } catch (err) {
      console.error(err);
  
      // Show an error toast message
      toast.error(`Cannot ${like ? "unlike" : "like"} the post`);
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
            <div className="icon" onClick={handleLike} style={{ backgroundColor: like ? 'red' : 'initial' }}>
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

