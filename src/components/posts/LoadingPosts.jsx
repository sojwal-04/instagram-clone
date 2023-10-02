import "./posts.scss";

const LoadingPosts = () => {
  return (
    <div className="post-container skeleton"
      style={{ border: "1px solid #e0e0e0" }}>
      <div className="profile-details">
        <div className="left skeleton">
          <div className="profilePic skeleton"></div>
          <div className="username reference-link username skeleton"></div>
          <div className="createdAt skeleton"></div>
        </div>
        <div className="right">
          <button className="delete-btn">Delete</button>
          <i></i>
        </div>
      </div>

      <div className="post-image skeleton"
        style={{ background: "white" }}></div>

      <div className="post-details"
        style={{ minHeight: "30px" }}>
        <div>
          <div className="left">
            <div className="icon">

            </div>
            <div className="icon">

            </div>
            <div className="icon">
            </div>
          </div>
          <div className="right"></div>
        </div>

        <div className="likes-count skeleton"></div>

        <div className="caption skeleton"></div>

        <div className="comments-count skeleton"></div>

        <div className="add-comment skeleton"></div>
      </div>
    </div>
  );
};

export default LoadingPosts;
