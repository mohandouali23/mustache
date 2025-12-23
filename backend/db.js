import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI est indéfini. Vérifie ton fichier .env !');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connecté');
  } catch (err) {
    console.error('Erreur MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
