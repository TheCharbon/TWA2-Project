import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';


import postRoutes from './routes/posts.js';

import authRoutes from './routes/auth_routes.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(morgan("tiny"));


app.use('/posts', postRoutes);
app.use('/auth', authRoutes)
app.use(express.static(path.join('react_build')))

const CONNECTION_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);