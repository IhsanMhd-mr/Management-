import express from "express";
const app = express();
import cors from "cors";

import { firebaseConfig } from "./Configs/Firebase.js";
import { initializeApp } from "firebase/app";

import bodyParser from 'body-parser';
import path from 'path';


app.use(cors());
initializeApp(firebaseConfig);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type",
      'Content-Type: multipart/form-data'

  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

import devRoutes from "./Routes/devRoutes.js";
import clientRoutes from "./Routes/clientRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import recordRoutes from "./Routes/recordRoutes.js";
// import docRoutes from "./Routes/docRoutes.js";

const PORT = process.env.PORT || 8081;


app.use('/devs', devRoutes );
app.use('/clients', clientRoutes );
app.use('/projects', projectRoutes )
app.use('/records', recordRoutes );
// app.use('/docs', docRoutes );

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});