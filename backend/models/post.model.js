const mongoose = require("mongoose");

// Structure de la base de données
const postShema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        likers: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);
//(Nom de la collection, strucutre de la collection)
module.exports = mongoose.model("post", postShema);
