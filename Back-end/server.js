const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
//Lecture of CORS we added Origin but for project I skipped that work
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//now to use all routes in router folder
//we will use readdirsync from filesystem 'fs'
const { readdirSync } = require("fs"); //this will return array of all route fuke in forlder

//routes
readdirSync("./routes").map((r) => {
  app.use("/", require("./routes/" + r));
});

//database
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (err) {
    console.log(`Error Occurred While DB Connection: ${err}`);
  } else {
    console.log("Connected Successfully With MongoDB");
  }
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
