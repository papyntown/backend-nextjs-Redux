import { createPost, getPosts } from "@/feature/post.slice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewPost = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);

    const HandleForm = (e) => {
        e.preventDefault();
        const data = {
            message: message,
            author: userId,
            // Id provisoir en attendant le retour de la BDD
            _id: Date.now(),
        };
        // axios va prendre l'url et l'object JS que l'on veut envoyer
        axios.post("http://localhost:5000/post/", data).then(() => {
            dispatch(createPost(data));
            // GetPosts car il faut allez chercher l'ID crée par mongoDB
            //  et dans getPost j'aurais la requete vers l'api
            dispatch(getPosts());
        });
        setMessage("");
    };

    const [message, setMessage] = useState("");
    return (
        <form
            className="new-post-container"
            onSubmit={(e) => {
                HandleForm(e);
            }}>
            <textarea
                placeholder="Envoyer votre message"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}></textarea>
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default NewPost;
