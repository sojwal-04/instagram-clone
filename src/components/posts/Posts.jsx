
import "./posts.scss"

import { useEffect, useState } from "react";

// import { posts } from "../../data"
import Post from "../post/Post";
import axios from "axios";
import { makeRequest } from "../../utils/makeRequest";
import { useSelector } from "react-redux";
// import instance from "../../axios/axios";

// const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Posts = () => {
  const user = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {

      console.log("user, ", user);
      console.log("id", user._id);

      if (user && user._id) {
        try {
          setLoading(true);
          const { data } = await makeRequest.get(`/posts/getPosts?userId=${user?._id}`);
          setLoading(false);
          setPosts(data.posts);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      } else {
        // Handle the case when user data is not available
        setLoading(false);
        setError("User data not available");
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div className="posts-container">
      {loading ? (
        <p style={{ color: "green" }}>Loading</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error.message}</p>
      ) : (
        posts?.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
