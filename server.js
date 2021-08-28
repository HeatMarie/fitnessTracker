const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const routes = require("./routes")

const PORT = process.env.PORT || 3000; 

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(require("./routes/api.js"));
app.use(require("./routes/view"));

app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}!`);
});