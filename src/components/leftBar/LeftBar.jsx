import "./leftBar.scss"

import { useDispatch, useSelector } from 'react-redux';
import {List, ListItem, ListItemText } from '@mui/material';

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import InstaHub from "../../assets/instahub.png";



const LeftBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {

    try {

      dispatch(setToken(null));
      dispatch(setUser(null));

      // Optionally, you can clear the JWT token from localStorage
      localStorage.removeItem('token');

      // Perform any other necessary cleanup or redirection
      // For example, redirect the user to the login page
      navigate("/login");
    } catch (err) {
      console.error('Error while logging out: ' + err.message);
      // Handle any potential errors here
    }
  };


  // const [open, setOpen] = useState(false);

  // const toggleDrawer = (openStatus) => () => {
  //   setOpen(openStatus);
  // };

  return (
    <div className="leftbar-container">

      <div className="insta-name">
        <img src={InstaHub} alt="" />
      </div>
      {/* <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      > */}

      <List className='list'>
        <ListItem key="home" onClick={() => navigate("/")} className="list-item">
          <HomeRoundedIcon className="icon" />
          <ListItemText primary="Home" className="text" />
        </ListItem>
        <ListItem key="search" className="list-item">
          <SearchRoundedIcon className="icon" />
          <ListItemText primary="Search" className="text" />
        </ListItem>
        <ListItem key="explore" className="list-item">
          <ExploreRoundedIcon className="icon" />
          <ListItemText primary="Explore" className="text" />
        </ListItem>
        <ListItem key="reels" className="list-item">
          <MovieCreationRoundedIcon className="icon" />
          <ListItemText primary="Reels" className="text" />
        </ListItem>
        <ListItem key="messages" className="list-item">
          <ChatBubbleOutlineRoundedIcon className="icon" />
          <ListItemText primary="Messages" className="text" />
        </ListItem>
        <ListItem key="notifications" className="list-item">
          <FavoriteBorderRoundedIcon className="icon" />
          <ListItemText primary="Notifications" className="text" />
        </ListItem>
        <ListItem key="create" className="list-item">
          <ControlPointRoundedIcon className="icon" />
          <ListItemText primary="Create" className="text" />
        </ListItem>
        <ListItem key="profile" onClick={() => navigate(`/users/${user?.username}`)} className="list-item">
          <div className="icon profilePic">
            <img src={user?.profilePic} alt="" />
          </div>
          <ListItemText primary="Profile" className="text" />
        </ListItem>
        <ListItem key="logout" className="list-item" onClick={handleLogout}>
          <LogoutIcon className="icon" />
          <ListItemText primary="Logout" className="text" />
        </ListItem>
      </List>
      {/* </SwipeableDrawer> */}
    </div>
  );
};

export default LeftBar;
