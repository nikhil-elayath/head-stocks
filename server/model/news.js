var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongodb = "mongodb://localhost:27017/stocks";
mongoose.connect(mongodb);
console.log("Connection to mongoStocks Established");

var news = new Schema(
  {
    new_id: Number,
    headline: String,
    description: String,
    news_image: String
  },
  { collection: "news" }
);

var NewsData = mongoose.model("News", news);
module.exports = NewsData;
