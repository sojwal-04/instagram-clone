import "./posts.scss"

import { useEffect, useState } from "react";

import { posts } from "../../data"
import Post from "../post/Post";
import instance from "../../axios/axios";

const Posts = () => {

  /*
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Define your fetchPosts function
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await instance.get("/posts");
      const data = await response.json();

      setPosts(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  */

  return (
    <div className="posts-container">
      {
        posts?.map((post) => (<Post key={post?.id} post={post} />))
      }
    </div>
  )
}

export default Posts