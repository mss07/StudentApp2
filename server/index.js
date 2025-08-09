import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


import { Connection } from './database/db.js';
import router from './routes/route.js';

const app=express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', router);

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const PORT=8000;
Connection(USERNAME,PASSWORD);
app.listen(PORT,console.log(`Server is running successfully on ${PORT} port`));