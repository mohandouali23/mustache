import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import path from 'path';
import connectDB from './db.js';
import surveyRoutes from './routes/survey.routes.js';
import responseRoutes from './routes/response.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// connexion MongoDB
connectDB();

/* VIEWS */
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.resolve('frontend/views'));

/* STATIC FILES */
app.use('/assets', express.static(path.resolve('frontend/public')));

// Middleware pour parser POST
/* FORMS */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ROUTES */
app.use('/survey', surveyRoutes);          // afficher questions
app.use('/api/responses', responseRoutes); // CRUD réponses

export default app;
