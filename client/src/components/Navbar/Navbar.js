import React from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';

const Navbar = () => {
  const user = null;
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandCOntainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Posts</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt =  {user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6"></Typography>
            <Button variant = "contained" className={classes.logout} color="secondary"></Button>
          </div>
        ):(
          <Button component={Link} to="/auth" variant="contained" color="primary"></Button>

        )}


      </Toolbar>
    </AppBar>
  )
};


export default Navbar;