import { editPost } from "@/feature/post.slice";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";

const Post = ({ post }) => {
    const userId = useSelector((state) => state.user.userId);
    const [author, setAuthor] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const textAreaRef = useRef(null); // Référence à la zone de texte
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();

    const dateFormateur = (date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    };

    if (post.length < 1) {
        return <p>Chargement...</p>;
    }

    useEffect(() => {
        if (userId === post.author) {
            setAuthor(true);
        } else {
            setAuthor(false);
        }
    }, [userId]);

    const handleTextAreaBlur = () => {
        setIsEdit(false); // Quitte le mode édition
        handleEdit();
    };
    const handleEdit = () => {
        if (newMessage) {
            axios
                .put(`http://localhost:5000/post/${post._id}`, {
                    message: newMessage,
                })
                .then(() => dispatch(editPost([newMessage, post._id])));
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3>{post.author}</h3>
                <p>posté le {dateFormateur(post.createdAt)}</p>
            </div>
            {isEdit ? (
                <div className="edit-container">
                    <textarea
                        defaultValue={newMessage ? newMessage : post.message}
                        ref={textAreaRef}
                        onBlur={handleTextAreaBlur}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            setIsEdit(false);
                            handleEdit();
                        }}>
                        Valider édition
                    </button>
                </div>
            ) : (
                <p>{newMessage ? newMessage : post.message}</p>
            )}
            <div className="icons-part">
                <LikePost post={post} />
                {author && (
                    <div className="update-delete-icons">
                        <span
                            id="update-btn"
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}>
                            &#10000;
                        </span>
                        {author && <DeletePost postId={post._id} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
