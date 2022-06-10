import Post from './Post/Post.js'
import useStyles from './styles'
import React from "react";

const Posts = () => {
    const classes = useStyles();
    return (
        <>
            <h1> Posts </h1>
            <Post/>
            <Post/>
        </>
    )
}

export default Posts