import "./leftBar.scss"

import { useState } from 'react';
import { useDispatch } from 'react-redux';



import InstaHub from "../../assets/instahub.png"
import { SwipeableDrawer, List, ListItem, ListItemText } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { setToken } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";

const LeftBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <ListItem button key="home" className="list-item">
          <HomeRoundedIcon className="icon" />
          <ListItemText primary="Home" className="text" />
        </ListItem>
        <ListItem button key="search" className="list-item">
          <SearchRoundedIcon className="icon" />
          <ListItemText primary="Search" className="text" />
        </ListItem>
        <ListItem button key="explore" className="list-item">
          <ExploreRoundedIcon className="icon" />
          <ListItemText primary="Explore" className="text" />
        </ListItem>
        <ListItem button key="reels" className="list-item">
          <MovieCreationRoundedIcon className="icon" />
          <ListItemText primary="Reels" className="text" />
        </ListItem>
        <ListItem button key="messages" className="list-item">
          <ChatBubbleOutlineRoundedIcon className="icon" />
          <ListItemText primary="Messages" className="text" />
        </ListItem>
        <ListItem button key="notifications" className="list-item">
          <FavoriteBorderRoundedIcon className="icon" />
          <ListItemText primary="Notifications" className="text" />
        </ListItem>
        <ListItem button key="create" className="list-item">
          <ControlPointRoundedIcon className="icon" />
          <ListItemText primary="Create" className="text" />
        </ListItem>
        <ListItem button key="logout" className="list-item" onClick={handleLogout}>
          <LogoutIcon className="icon" />
          <ListItemText primary="Logout" className="text" />
        </ListItem>
      </List>
      {/* </SwipeableDrawer> */}
    </div>
  );
};

export default LeftBar;
