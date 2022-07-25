const path = require("path");
const fs = require("fs");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const publicHtmlDir = path.resolve("./client/");
console.log("Web content served from", publicHtmlDir);

app.use((req, res, next) => {
  const targetResource = path.resolve(
    path.join(
      publicHtmlDir,
      req.originalUrl === "/" ? "/index.html" : req.originalUrl
    )
  );
  if (fs.existsSync(targetResource)) {
    res.sendFile(targetResource);
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log("Open your browser and go to http://localhost:3000/");
});
