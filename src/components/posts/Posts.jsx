import "./posts.scss"
import "../../main.scss"

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import { makeRequest } from "../../utils/makeRequest";
import { setPosts } from "../../redux/slices/homePostsSlice";
import LoadingPosts from "./LoadingPosts";

const Posts = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const posts = useSelector(state => state.homePosts)

  useEffect(() => {
    const fetchPosts = async () => {
      if (user._id) {
        try {
          setLoading(true);
          const { data } = await makeRequest.get(`/posts/getPosts?userId=${user?._id}&isHome=${"isHome"}`);
          dispatch(setPosts(data.posts));
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("User data not available");
      }
    };

    fetchPosts();
  }, []);



  return (
    <div className="posts-container">
      {
        loading ? (
          <>
            <LoadingPosts />
            <LoadingPosts />
            <LoadingPosts />
            <LoadingPosts />
            <LoadingPosts />
          </>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error.message}</p>
        ) : (
          posts?.map((post, index) => (
            <Post key={post._id} index={index} post={post} />
          ))
        )
      }
    </div>
  );
};

export default Posts;
