import "./post.scss"

import CommentIcon from "../../assets/CommentIcon";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from "../../assets/ShareIcon";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { makeRequest } from "../../utils/makeRequest";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "../../redux/slices/homePostsSlice";

const Post = ({ post, index }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(state => state.user)

  const [color, setColor] = useState("black");
  const [like, setLike] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);



  let timeStamp = formatDistanceToNow(new Date(post?.createdAt), {
    addSuffix: false, // Adds "ago" or "from now"
  });


  useEffect(() => {
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
    fetchLikeStatus();
  }, [post, user]);

  const handleLike = async () => {
    try {
      const isLiked = like;

      const updatedPost = { ...post };
      if (isLiked) {
        await makeRequest.delete(`/likes/unlike?postIdToUnlike=${post?._id}&unlikedBy=${user?._id}`);
        updatedPost.likesCount -= 1;
        setLike(!isLiked);
      } else {
        await makeRequest.post(`/likes/like?postIdToLike=${post?._id}&likedBy=${user?._id}`);
        updatedPost.likesCount += 1;
        setLike(!isLiked);
      }
      dispatch(setPost({ index, updatedPost }))
      toast.success(`${isLiked ? "Unliked" : "Liked"} the post`);
    } catch (err) {
      toast.error(`Cannot ${like ? "unlike" : "like"} the post`);
    }
  }



  const handleComment = async () => {
    try {
      // Check if the comment text is not empty
      const updatedPost = { ...post };

      if (commentText.trim() !== "") {

        const { data } = await makeRequest.post("/comments/postComment", {
          postId: post._id,
          userId: user._id,
          text: commentText,
        });

        const newComment = { data }

        toast.success("Comment posted successfully");
        updatedPost.commentsCount += 1;
        dispatch(setPost({ index, updatedPost }))
        setCommentText("");
      } else {
        toast.success("Error while posting comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await makeRequest.delete(`/posts/delete?postId=${post._id}&userId=${user._id}`);
      toast.success("Post deleted successfully");
      dispatch(deletePost(post._id));
    } catch (err) {
      console.log(err);
      toast.error("Error while delelete post");
    }
  }


  return (
    <div className="post-container">
      <div className="profile-details">
        <div className="left">
          <div className="profilePic">
            <img src={post?.user?.profilePic} alt="profilePic" />
          </div>
          <div className="username" onClick={() => navigate(`/users/${post?.user?.username}`)}>
            <div className=" reference-link username">
              {post?.user?.username}
            </div>
          </div>
          <div className="createdAt">
            {timeStamp}
          </div>
        </div>
        <div className="right">
          <button
            className={`delete-btn ${showDeleteButton && user._id === post.user._id ? "show-delete" : ""}`}
            onClick={handleDeletePost}
          >
            Delete
          </button>
          <i onClick={() => setShowDeleteButton(!showDeleteButton)}>
            {showDeleteButton ? <CloseIcon /> : <BsThreeDots />}
          </i>
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
            <div
             className="icon"
             onClick={() => navigate(`/p/${post?._id}`, { state: { post } })}
             >
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

        <div className="caption">
          <p>
            <span className="username"
              style={{ fontWeight: "500" }}
              onClick={() => navigate(`/users/${post?.user?.username}`)}
            >
              {post?.user?.username}
            </span>
            {` ${post?.caption}`}
          </p>
        </div>

        <div className="comments-count">
          {
            post?.commentsCount > 0 &&
            `View  ${post?.commentsCount > 1 ? "all" : ""} ${post?.commentsCount} ${post?.commentsCount > 1 ? "comments" : "comment"} `
          }
        </div>

        <div className="add-comment">
          <input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)} // Update the comment text state
          />
          <button
            className="post-btn"
            onClick={handleComment}
            style={{ display: commentText.trim() === "" ? "none" : "block" }} // Disable the button if commentText is empty
          >
            Post
          </button>
        </div>
      </div>

    </div>
  )
}

export default Post

