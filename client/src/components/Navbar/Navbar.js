import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import useStyles from './styles';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(user);

  const logout = () =>{
    dispatch({type:'LOGOUT'});
    setUser(null);
    navigate('/');
  }

  useEffect(()=>{
    const token = user?.token;

    if (token){
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandCOntainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Posts</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

        )}


      </Toolbar>
    </AppBar>
  )
};


export default Navbar;