var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stocks = new Schema(
  {
    ticker_id: Number,
    ticker_name: String,
    company_name: String,
    simfin_Id: Number,
    sector: String,
    industry: String,
    ticker_dates: Schema.Types.Mixed,
    ohlc_data: Schema.Types.Mixed,
    isIndex: Boolean
  },
  { collection: "stocks_data_2" }
);

var StocksData = mongoose.model("Stocks", stocks);
module.exports = StocksData;
