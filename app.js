const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoute');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());

// Connexion à la base de donnees
mongoose.connect('mongodb://127.0.0.1:27017/blogapp');

// Verifier la connexion à la base de donnees
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('la connexion est active');
});

// Routes
app.use('/', userRoutes);
app.use('/', postRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
