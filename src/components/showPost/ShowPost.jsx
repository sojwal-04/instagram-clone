import "./showPost.scss"

import CommentIcon from "../../assets/CommentIcon";
// import LikeIcon from "../../assets/LikeIcon";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShareIcon from "../../assets/ShareIcon";
import { formatDistanceToNow } from "date-fns"
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { comments } from "../../data";
import { useEffect, useState } from "react";
import { makeRequest } from "../../utils/makeRequest";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../../redux/slices/commentsSlice";

const ShowPost = () => {

  const { postId } = useParams();
  const user = useSelector(state => state.user)

  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments)

  console.log(comments);
  console.log(postId);

  const navigate = useNavigate();
  const location = useLocation();

  const post = location.state.post;

  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(null);

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
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data } = await makeRequest.get(`/comments/fetchComments?postId=${postId}`);
        dispatch(setComments(data?.comments))
        console.log("Data", data.comments);
        console.log("DATA", data);
        setLoading(false);
      } catch (err) {
        setLoading(false)
        console.log(err);
      }
    }

    fetchComments();
  }, [])

  let show = true;
  let color = "black";

  let username = "sojwal._";


  let timeStamp = formatDistanceToNow(new Date(post?.createdAt), {
    addSuffix: true, // Adds "ago" or "from now"
  });

  return (
    <div className={`showpost-container ${show ? "show" : ""}`}>

      <div className="showpost">
        <div className="left">
          <img src={post.imageUrl} alt="" />
        </div>

        <div className="right">
          <div className="top">
            <div className="top-left">
              <div className="profilePic">
                <img src={post?.user?.profilePic} alt="" />
              </div>
              <p>
                {post?.user?.username}
              </p>
            </div>
            <div className="top-right">
              X
            </div>
          </div>
          <div className="comments">
            {
              comments?.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="profilePic">
                    <img src={comment.user.profilePic} alt="" />
                  </div>
                  <div className="comment-content">
                    <span id="username" onClick={() => navigate(`/users/${username}`)} >
                      {comment.user.username}
                    </span>
                    {` ${comment.text}`}
                  </div>
                </div>
              ))
            }
          </div>

          <div className="post-details">
            <div className="icons">
              <div className="icon" >
                {like ? (
                  <FavoriteOutlinedIcon
                    className={`like-icon ${like ? 'liked' : ''}`}
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
            <div>
              <p>{`${post?.likesCount} likes`}</p>
              <p>{timeStamp}</p>
            </div>
            <div className="add-comment">
              <input type="text" placeholder="Add a comment..." />
              <button className="post-btn">Post</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default ShowPost