var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongodb = "mongodb://localhost:27017/";
mongoose.connect(mongodb);
console.log("Connection to mongoStocks Established");

var stocks = new Schema({
  ticker_id: Number,
  ticker_name: String,
  company_name: String,
  simfin_Id: Number,
  sector: String,
  industry: String,
  ticker_dates: Schema.Types.Mixed,
  ohlc_data: Schema.Types.Mixed,
  isIndex: Boolean
});

var StocksData = mongoose.model("Stocks", stocks);
module.exports = StocksData;
