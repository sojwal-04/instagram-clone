import "./profile.scss"
// import numeral from "numeral";
// import { posts } from "../../data"
import { useSelector } from "react-redux";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentIcon from "../../assets/CommentIcon";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../utils/makeRequest";
import toast from "react-hot-toast";

const Profile = () => {

  const [following, setFollowing] = useState(true);
  const [posts, setPosts] = useState([]);

  const [profileDetails, setProfileDetails] = useState({
    _id: null,
    username: "",
    profilePic: "",
    name: "",
    postCount: 0,
    followingCount: 0,
    followersCount: 0,
  })



  const { username } = useParams();

  console.log("Parameters:", username);

  const myUser = useSelector(state => state.user.user)
  // /*
  const user = {
    // username: `sojwal._`,
    // posts: 89,
    // followings: 190,
    // followers: 290,
    name: "Sojwal",
    userBio: "Attitude is Everything",
    likes: 100,
    comments: 34
  }
  // */

  const handleFollow = async () => {
    try {
      const url = `/relationships/${following ? 'unfollow' : 'follow'}?followerId=${user?._id}&userIdToFollow=${profileDetails?._id}`;
      if (following) {
        await makeRequest.delete(url);
      } else {
        await makeRequest.post(url);
      }
      setFollowing(!following);
    } catch (err) {
      console.log(err);
      toast.error(`Error while ${following ? 'unfollowing' : 'following'}. Try Again`)
    }
  }



  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const { data } = await makeRequest.get(`/profile/${username}`);

        setProfileDetails(data.profileDetails);

        console.log("Above2");
        console.log("profile details :", data.profileDetails);

      } catch (err) {
        console.log(err);
        toast.error("Error while fetching profile details");
      }
    };

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

    const fetchRelationship = async () => {
      try {
        console.log("Above1");
        const response = await makeRequest.get(`/relationships/?followerId=${user?._id}&userIdToFollow=${profileDetails?._id}`);

        console.log("response :", response);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProfileDetails();
    fetchPosts(); // Call the fetchPosts function to fetch the user's posts.
    fetchRelationship();

  }, [username]);

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
              myUser?.username === username ?
                (
                  <button className="edit">Edit Profile</button>
                )
                :
                (
                  <button onClick={handleFollow} className="delete">{following ? "Unfollow" : "Follow"}</button>
                )
            }

          </div>

          <div className="user-status">
            <div><span>{profileDetails?.postCount ?? 0}</span>{` posts`}</div>
            <div><span>{profileDetails?.followersCount ?? 0}</span>{` followers`}</div>
            <div><span>{profileDetails?.followingCount ?? 0}</span>{` following`}</div>
          </div>

          <div className="name">{profileDetails?.name}</div>

          <div className="user-bio">{user?.userBio} </div>
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