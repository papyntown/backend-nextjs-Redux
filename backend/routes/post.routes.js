const express = require("express");
const {
    setPosts,
    getPosts,
    editPosts,
    deletePosts,
    likePost,
    disLikePost,
} = require("../controllers/post.controller");
const router = express.Router();
// Création d'une route
router.get("/", getPosts);

// Tu va me jouer la fonction setPosts du controllers
router.post("/", setPosts);

// l'id je ne le connais pas je le récupère dans l'url
router.put("/:id", editPosts);

router.delete("/:id", deletePosts);

router.patch("/like-post/:id", likePost);

router.patch("/dislike-post/:id", disLikePost);

module.exports = router;
