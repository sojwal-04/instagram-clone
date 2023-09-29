import "./post.scss"

import CommentIcon from "../../assets/CommentIcon";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import ShareIcon from "../../assets/ShareIcon";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { makeRequest } from "../../utils/makeRequest";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../redux/slices/homePostsSlice";

const Post = ({ post, index }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(state => state.user)

  const [color, setColor] = useState("black");
  const [like, setLike] = useState(null);
  const [openComment, setOpenComment] = useState(false);


  let timeStamp = formatDistanceToNow(new Date(post?.createdAt), {
    addSuffix: false, // Adds "ago" or "from now"
  });


  useEffect(() => {
    // Function to fetch like status when the component mounts
    const fetchLikeStatus = async () => {
      try {
        if (user?._id) {
          // Check if the user has liked the post
          const { data } = await makeRequest.get(`/likes/getLike?postId=${post?._id}&userId=${user?._id}`);
          setLike(data.like !== null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchLikeStatus(); // Fetch like status when the component mounts
  }, [post, user]);

  const handleLike = async () => {
    try {
      // Check if the post is already liked
      const isLiked = like;

      const  updatedPost  = { ...post };

      // Determine the action based on the current like status
      if (isLiked) {
        // If already liked, unlike the post;
        await makeRequest.delete(`/likes/unlike?postIdToUnlike=${post?._id}&unlikedBy=${user?._id}`);
        updatedPost.likesCount -= 1;
      } else {
        // If not liked, like the post
        await makeRequest.post(`/likes/like?postIdToLike=${post?._id}&likedBy=${user?._id}`);
        // console.log("Liked");
        updatedPost.likesCount += 1;
      }
      console.log("first updated post", updatedPost);
      
      setLike(!isLiked);
      dispatch(setPost({index, updatedPost}))
      console.log("second updated post", updatedPost);

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

      <div className="post-image" onDoubleClick={handleLike}>
        <img src={post?.imageUrl} alt="image" />
      </div>

      <div className="post-details">
        <div>
          <div className="left">
            <div className="icon" onClick={handleLike} >
              {like ? (
                <FavoriteOutlinedIcon
                  className={`like-icon ${like ? 'liked' : ''}`}
                // style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  className={`like-icon`}

                />
              )}
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
          {`${post?.likesCount ?? 0} ${post?.likesCount > 1 ? "likes" : "like"}`}
        </div>

        <div className="comments-count">
          {
            post?.comments > 0 &&
            `View all ${post?.commentsCount} comments`
          }
        </div>

        <input className="add-comment" placeholder="Add a comment..." />
      </div>

    </div>
  )
}

export default Post

