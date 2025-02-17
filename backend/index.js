const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./database/Connect");
const cors = require('cors');

app.use(express.json());

require('dotenv').config();

app.use(cors({
  origin: '*'
}))



// connect to database
const port = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
        console.log(`Server is listen on port ${port}...`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();