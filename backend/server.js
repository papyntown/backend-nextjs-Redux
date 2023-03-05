const express = require("express");
const port = 5000;
const dotenv = require("dotenv").config(); // Pour pouvoir utiliser les variables d'environnement
const app = express();
const cors = require("cors");

//MongoDB connexion
const connectDB = require("./config/db");
connectDB();

//Authorisation CORS
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

// Middleware Pour pouvoir lire les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Quand tu m'envoie un post je veux que aille me chercher la logique de post dans le fichier routes
app.use("/post", require("./routes/post.routes"));

//Lancer le serveur:
// au port 5000 notre serveur va écouter les requêtes  si ça marche il nous log
app.listen(port, () => console.log(`Le serveur a démarée au ports : ${port}`));
