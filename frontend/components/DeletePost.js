import { deletePost } from "@/feature/post.slice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const DeletePost = ({ postId }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/post/${postId}`, {
            postId,
        });
        dispatch(deletePost(postId));
    };

    return (
        <span id="delete-btn" onClick={() => handleDelete()}>
            &#10010;
        </span>
    );
};

export default DeletePost;
