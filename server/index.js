const express = require("express");
const mongoose = require("mongoose");
const schoolROute = require("./routes/schools/school");
require("dotenv").config();

//express app
const app = express();

//middlewares

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/schools", schoolROute);
const port = 5000;

//connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Connected to the databse and listening on port${port}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
