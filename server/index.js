const express = require("express");

const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const mongoURL = "mongodb://localhost:27017/stocks";
const users = require("./routes/api/Users");
const home = require("./routes/api/Home");
const company = require("./routes/api/Stocks");
const companydetails = require("./routes/api/CompanyDetail");
const navbar = require("./routes/api/Navbar"); // Harshal
const indexProfile = require("./routes/api/IndicesProfile");

console.log(mongoURL);

mongoose.connect(mongoURL);
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(logger("common"));
//Bhavna
app.use("/api/users/", users);
app.use("/api/indicesprofile/", indexProfile);

//piyush
app.use("/api/home/", home);

//Nikhil
app.use("/api/companydetail/", companydetails);
app.use("/api/companydetail/balancesheet/", companydetails);
app.use("/api/sector/", company);

//harshal
app.use("/api/navbar/", navbar);

const port = process.env.port || 2001;

// if (process.env.NODE_ENV !== "test")
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
