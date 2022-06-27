import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LockedOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import jwt_decode from 'jwt-decode';

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const handleSubmit = () => {

    };

    const handleChange = () => {

    };
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    };
    const switchMode = () => {
        setIsSignup((prev) => !prev);
        handleShowPassword(false);
    };
    
    const googleSuccess = async (res) => {
        console.log(res.credential)
        const result = jwt_decode(res?.credential);
        const token = res?.credential;
        try {
            dispatch({type:'AUTH',data : {result,token}})
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
        console.log('google sign in was unsucessful');
    };

    return (
        <div>
            <GoogleOAuthProvider clientId='762680779584-jom66p9nqir7aju4sqps1i1eb42spcid.apps.googleusercontent.com'>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.Avatar}>
                            <LockedOutlinedIcon />

                        </Avatar>
                        <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                        <form className={classes.form} onSubmit={handleSubmit()}>
                            <Grid container spacing={2}>
                                {
                                    isSignup ? (
                                        <>
                                            <Input name='firstName' label='First Name' onChange={handleChange} autoFocus half />
                                            <Input name='firstName' label='First Name' onChange={handleChange} half />
                                        </>
                                    ) : null
                                }
                                <Input name='email' label='Email Address' handleCHange={handleChange} type='email' />
                                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                {isSignup ? <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> : null}
                                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? 'Sign up' : 'Sign in'}</Button>
                                <Grid container justifyContent='center'>

                                    <GoogleLogin
                                        onSuccess={googleSuccess}
                                        onError={googleFailure}
                                    />
                                </Grid>

                                <Grid container justifyContent='flex-end'>
                                    <Grid item >
                                        <Button onClick={switchMode}>
                                            {isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </GoogleOAuthProvider>
        </div>
    )
}

export default Auth