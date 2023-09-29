import "./profile.scss"
// import numeral from "numeral";
// import { posts } from "../../data"
import { useDispatch, useSelector } from "react-redux";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentIcon from "../../assets/CommentIcon";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../utils/makeRequest";
import toast from "react-hot-toast";
import { setProfile } from "../../redux/slices/profileSlice";

const Profile = () => {

  const dispatch = useDispatch();

  const { username } = useParams();

  const [following, setFollowing] = useState(null);
  const [posts, setPosts] = useState([]);

  const profileDetails = useSelector((state) => state.profile.profileDetails);

  const user = useSelector(state => state.user)
  // /*
  const myUser = {
    userBio: "Attitude is Everything",
    likes: 100,
    comments: 34
  }
  // */

  const handleFollow = async () => {
    try {
      let url;
      const updatedProfileDetails = { ...profileDetails }; // Create a copy of profileDetails

      if (following !== null && following) {
        url = `/relationships/unfollow?followerId=${user?._id}&userIdToUnfollow=${profileDetails?._id}`;
        await makeRequest.delete(url);
        updatedProfileDetails.followersCount--; // Decrement followingCount
      } else if (following !== null) {
        url = `/relationships/follow?followerId=${user?._id}&userIdToFollow=${profileDetails?._id}`;
        await makeRequest.post(url);
        updatedProfileDetails.followersCount++; // Increment followingCount
      }
      setFollowing(!following);

      // Dispatch an action to update the Redux store with the updated profileDetails
      dispatch(setProfile(updatedProfileDetails));

      toast.success(`Successfully ${!following ? 'followed' : 'unfollowed'} ${profileDetails?.username}`);
    } catch (err) {
      console.log(err);
      toast.error(`Error while ${following ? 'unfollowing' : 'following'}. Try Again`)
    }
  }


  const fetchRelationship = async () => {
    try {
      console.log("Fetching relationship");
      const { data } = await makeRequest.get(`/relationships/fetchRelationship?follower=${user?.username}&following=${username}`);
      console.log("Fetching relationship 2");
      setFollowing(JSON.stringify(data.relationship) ? true : false)
    } catch (err) {
      console.log(err);
    }
  };



  const fetchProfileDetails = async () => {
    try {
      const { data } = await makeRequest.get(`/profile/${username}`);

      console.log("inside the functinosss");

      const profileData = data?.profileDetails;

      console.log("Setting details ; ", profileData);

      // Dispatch the setProfile action to update Redux store
      dispatch(setProfile(profileData));

      fetchRelationship();
    } catch (err) {
      console.log(err);
      toast.error("Error while fetching profile details");
    }
  };


  /*
  const fetchPosts = async () => {
    try {
      // Fetch user's posts using the user's username (profileDetails.username)
      const { data } = await makeRequest.get(`/posts/${profileDetails.username}`);

      // Update the posts state with the fetched data
      setPosts(data.posts);

      console.log("Fetched posts:", data.posts);
    } catch (err) {
      console.log(err);
      toast.error("Error while fetching posts");
    }
  };

  */

  useEffect(() => {
    fetchProfileDetails();
    // fetchPosts(); // Call the fetchPosts function to fetch the user's posts.

  }, [username]); // Include fetchRelationship as a dependency


  // ... (rest of the code)


  return (
    <div className="profile-container">

      <div className="user">
        <div className="left">
          <div className="profilePic">
            {/* <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1594779152.1686824772&semt=ais" alt="" /> */}
            <img src={profileDetails?.profilePic} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="user-details">
            <div className="username">{profileDetails?.username}</div>
            {
              user?.username === username ?
                (
                  <button >Edit Profile</button>
                )
                :
                (
                  <button onClick={handleFollow} className={!following ? 'btn-primary' : ''}>
                    {following === null ? "Loading" : (following ? "Unfollow" : "Follow")}
                  </button>
                )
            }

          </div>

          <div className="user-status">
            <div><span>{profileDetails?.postCount ?? 0}</span>{` posts`}</div>
            <div><span>{profileDetails?.followersCount ?? 0}</span>{` followers`}</div>
            <div><span>{profileDetails?.followingCount ?? 0}</span>{` following`}</div>
          </div>

          <div className="name">{profileDetails?.name}</div>

          <div className="user-bio">{myUser?.userBio} </div>
        </div>
      </div>

      <hr />

      <div className="profile-posts">

        {
          posts?.map((post) => {
            return (
              <div key={post?.id} className="post">
                <img src={post?.imageUrl} alt="" />
                <div className="post-info">
                  <div id="likes"> <FavoriteRoundedIcon /> {`${post?.likes} `} </div>
                  <div id="comments">  <CommentIcon color={"white"} fill={"red"} /> {`${post?.comments} `}</div>
                </div>
              </div>
            )
          })
        }

      </div>

      <Footer />

    </div>
  )
}

export default Profile