import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("getPosts", async (_, thunkAPI) => {
    axios
        .get("http://localhost:5000/post/")
        .then((res) => thunkAPI.dispatch(getPostsSuccess(res.data)));
});

// create a slice
export const postSlice = createSlice({
    name: "posts",
    initialState: {
        postsData: [],
    },
    reducers: {
        getPostsSuccess: (state, action) => {
            state.postsData = action.payload;
        },
        createPost: (state, action) => {
            state.postsData.push(action.payload);
        },
        editPost: (state, action) => {
            state.postsData = state.postsData.map((post) => {
                if (post._id === action.payload[1]) {
                    return {
                        // il va me retouner tous le post sauf message qui va changer
                        ...post,
                        message: action.payload[0],
                    };
                } else {
                    return post;
                }
            });
        },
        deletePost: (state, action) => {
            // Il va me renvoyer tous les ids qui ne sont pas égale au payload
            // Je passe l'id de celui que je veux supprimer dans le payload (DeletePosts.js)
            state.postsData = state.postsData.filter(
                (post) => post._id !== action.payload
            );
        },
        like: (state, action) => {
            state.postsData = state.postsData.map((post) => {
                if (post._id === action.payload[1]) {
                    return {
                        ...post,
                        likers: [...post.likers, action.payload[0]],
                    };
                } else {
                    return post;
                }
            });
        },
        dislike: (state, action) => {
            state.postsData = state.postsData.map((post) => {
                if (post._id === action.payload[1]) {
                    return {
                        ...post,
                        likers: post.likers.filter(
                            (userId) => userId !== action.payload[0]
                        ),
                    };
                } else {
                    return post;
                }
            });
        },
    },
});
// export the action
export const {
    getPostsSuccess,
    createPost,
    editPost,
    deletePost,
    like,
    dislike,
} = postSlice.actions;

// export default the store
export default postSlice.reducer;
