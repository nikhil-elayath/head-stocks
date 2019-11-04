const express = require("express");

const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const mongoURL = "mongodb://localhost:27017/headStocks";
const users = require("./routes/api/Users");
const home = require("./routes/api/Home");
const companydetails = require("./routes/api/CompanyDetail");
console.log(mongoURL);
mongoose.connect(mongoURL);
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(logger("common"));
//Bhavna
app.use("/api/users/", users);

//piyush
app.use("/api/home/", home);

//Nikhil
app.use("/api/companydetail/", companydetails);

const port = process.env.port || 2001;

// if (process.env.NODE_ENV !== "test")
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
