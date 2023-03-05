const PostModel = require("../models/post.model");

// Je récupère les données de la base de données
module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts);
};

// Je mets des données dans la base de données
module.exports.setPosts = async (req, res) => {
    // On vérifie si le message est vide
    if (!req.body.message) {
        res.status(400).json({ message: "Le message est vide" });
    }

    const post = await PostModel.create({
        message: req.body.message,
        author: req.body.author,
    });
    res.status(200).json(post);
};

// Modifier un post
module.exports.editPosts = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        res.status(400).json({
            message: "Post introuvable avec l'id : " + req.params.id,
        });
    }

    const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
        new: true,
    });
    res.status(200).json(updatePost);
};

// Supprimer un post
module.exports.deletePosts = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        res.status(400).json({
            message: "Post introuvable avec l'id : " + req.params.id,
        });
    }
    await post.remove();
    res.status(200).json({ message: "Post supprimé " + req.params.id });
};

// Like un post (Ajouter un like) Patch = modifier une valeur
module.exports.likePost = async (req, res) => {
    //$addToSet = Ajouter un élément dans un tableau
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.userId } },
            { new: true }
        ).then((data) => res.status(200).send(data));
    } catch (error) {
        res.status(400).json(error);
    }
};
module.exports.disLikePost = async (req, res) => {
    // $pull = supprimer un élément d'un tableau
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.userId } },
            { new: true }
        ).then((data) => res.status(200).send(data));
    } catch (error) {
        res.status(400).json(error);
    }
};
