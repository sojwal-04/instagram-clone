import "./showPost.scss"

import { comments } from "../../data";
import LikeIcon from "../../assets/LikeIcon";
import CommentIcon from "../../assets/CommentIcon";
import ShareIcon from "../../assets/ShareIcon";
import { useNavigate } from "react-router-dom";

const ShowPost = () => {

  const navigate = useNavigate();

  let show = true;
  let color = "black";

  let username = "sojwal._";

  const obj = {
    imageUrl: "https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg",
  }

  return (
    <div className={`showpost-container ${show ? "show" : ""}`}>
      <div className="showpost">
        <div className="left">
          <img src={obj.imageUrl} alt="" />
        </div>

        <div className="right">
          <div className="top">
            <div className="top-left">
              <div className="profilePic">
                <img src={obj.imageUrl} alt="" />
              </div>
              <p>
                alina._
              </p>
            </div>
            <div className="top-right">
              X
            </div>
          </div>
          <div className="comments">
            {
              comments?.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="profilePic">
                    <img src={comment.imageUrl} alt="" />
                  </div>
                  <div className="comment-content">
                    <span id="username" onClick={() => navigate(`/${username}`)} >{comment.username}</span>{`  ${comment.text}`}
                  </div>
                </div>
              ))
            }
          </div>

          <div className="post-details">
            <div className="icons">
              <div className="icon" >
                <LikeIcon fill={color} color={`${color}`} />
              </div>
              <div className="icon" >
                <CommentIcon color={color} />
              </div>
              <div className="icon" >
                <ShareIcon color={color} />
              </div>
            </div>
            <div>
              <p>{`${19292} likes`}</p>
              <p>25 days</p>
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