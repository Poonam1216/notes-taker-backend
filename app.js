const express = require("express");
const authrization = require("./authrization/jwt");
const app = express();
const cors = require("cors");
const PORT = 3004;
const dotenv = require("dotenv").config();
const connection = require("./db/connection")();
const userController = require("./routes/user");
const notesController = require("./routes/notes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.use("/", userController);
app.use("/", notesController);
app.listen(PORT, () => { console.log(`server started at ${PORT}`) })