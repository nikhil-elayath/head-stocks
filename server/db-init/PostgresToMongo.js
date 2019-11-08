var colors = require("colors");
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:root@192.168.0.28:5432/headstocks");
var MongoClient = require("mongodb").MongoClient;
const stocksData = require("./models/stocksModel");
const tickerNames = [];
const indexNames = [];

async function stocksDataLoad() {
  var i = await insertCompanies();

  await insertIndexes(2307);
}

stocksDataLoad();

async function insertCompanies() {
  const tickerQuery = `select distinct(ticker) from simfin order by ticker`;
  let tickerNameResult = await db.any(tickerQuery);
  tickerNameResult.forEach(async current_ticker => {
    // Distinct ticker names in this array [piyush]
    tickerNames.push(current_ticker.ticker);
  });
  console.log("\x1b[44m%s\x1b[0m", "All Ticker names Obtained");
  var i = 1;
  // For each ticker name find date and indicator names[piyush]
  for (ticker of tickerNames) {
    // ticker object as schema defined in models[piyush]
    let tickerObject = new stocksData();
    tickerObject.ticker_id = i;
    console.log(
      "Inserting data for ticker with id: ".magenta,
      i,
      "Total tickers remaining: ".magenta,
      tickerNames.length - i,
      "Out of :".magenta,
      tickerNames.length
    );
    tickerObject.ticker_dates = {};
    const sectorQuery = `select distinct(sector) from simfin where ticker='${ticker}'`;
    const sectorRes = await db.any(sectorQuery);
    tickerObject.sector = sectorRes[0]["sector"];
    tickerObject.isIndex = false;
    const industryQuery = `select distinct(industry) from simfin where ticker='${ticker}'`;
    const industryRes = await db.any(industryQuery);
    tickerObject.industry = industryRes[0]["industry"];
    tickerObject.ticker_name = ticker;
    const simfinIdres = `select distinct(simfinid) from simfin where ticker='${ticker}'`;
    const simRes = await db.any(simfinIdres);
    let simfin = "simfinid";
    tickerObject.simfin_Id = simRes[0][`${simfin}`];
    i++;
    // Declaring date for selected ticker name[piyush]
    let indicator_date = [];
    const indicatorDates = `select distinct(dates) from simfin where ticker = '${ticker}' order by dates`;
    const res = await db.any(indicatorDates);
    // Pushing dates into array for that ticker name[piyush]
    for (result of res) {
      var formatedDate = new Date(result["dates"]);
      formatedDate = formatedDate.toISOString().substring(0, 10);
      indicator_date.push(formatedDate);
    }
    // });
    // Iterating with indicator names and ticker name for date and corresponding value[piyush]
    for (current_indicator_date of indicator_date) {
      const getTickerValues = `select indicatorname,indicatorvalue from simfin where ticker='${ticker}' and dates='${current_indicator_date}';`;
      const f_res = await db.any(getTickerValues);
      d = current_indicator_date;

      if (f_res.length > 0) {
        tickerObject.ticker_dates[`${current_indicator_date}`] = {};
        f_res.forEach(f_result => {
          if (f_result.hasOwnProperty("indicatorvalue")) {
            tickerObject.ticker_dates[`${current_indicator_date}`][
              `${f_result["indicatorname"].replace(/\./g, "")}`
            ] = parseFloat(f_result["indicatorvalue"]);
          }
        });
      }
    }
    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
      if (err) throw err;
      else {
        // Initializing data base to use (MONGODB)[piyush]
        let database = client.db("stocks");
        database
          .collection("stocks_data")
          .insert(tickerObject, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "\x1b[44m%s\x1b[0m",
                "Data insterted for Ticker: ",
                tickerObject.ticker_name,
                " having id: ",
                tickerObject.ticker_id,
                " simfinId: ",
                tickerObject.simfin_Id,
                "with sector: ",
                tickerObject.sector,
                "with industry: ",
                tickerObject.industry
              );
            }
          });
      }
    });
  }
  return i;
}

async function insertIndexes(i) {
  // Fetch distinct index i.e ticker names from tables[piyush]
  const indexQuery = `select distinct(ticker) from yahoodata where isindex=true order by ticker`;
  let indexRes = await db.any(indexQuery);
  for (name of indexRes) {
    // Distinct indexes in this array[piyush]
    indexNames.push(name);
  }
  console.log("\x1b[44m%s\x1b[0m", "All Indexes names Obtained");
  // For each ticker name find date and indicator names[piyush]
  for (ticker of indexNames) {
    // ticker object as schema defined in models[piyush]
    let tickerObject = new stocksData();
    tickerObject.ticker_id = i;
    console.log(
      "Inserting data for index with id: ".magenta,
      i,
      "Total indexes remaining: ".magenta,
      indexNames.length - i,
      "Out of :".magenta,
      indexNames.length
    );
    tickerObject.ticker_dates = {};
    // Only true if index is present[piyush]
    tickerObject.isIndex = true;
    // Assign ticker name[piyush]
    tickerObject.ticker_name = ticker.ticker;
    i++;
    // Declaring date for selected ticker name
    let indicator_date = [];
    const indicatorDates = `select distinct(dates) from yahoodata where ticker = '${ticker.ticker}' order by dates`;
    const res = await db.any(indicatorDates);
    // Pushing dates into array for that ticker name
    for (result of res) {
      var formatedDate = new Date(result["dates"]);
      formatedDate = formatedDate.toISOString().substring(0, 10);
      indicator_date.push(formatedDate);
    }
    // Iterating with indicator names and ticker name for date and corresponding value
    for (current_indicator_date of indicator_date) {
      const getTickerValues = `select opening,high,low,closing,adjclose,volume from yahoodata where ticker='${ticker.ticker}' and dates='${current_indicator_date}';`;
      const f_res = await db.any(getTickerValues);
      d = current_indicator_date;
      if (f_res.length > 0) {
        tickerObject.ticker_dates[`${current_indicator_date}`] = {};
        // console.log("\x1b[33m%s\x1b[0m", f_res);
        f_res.forEach(f_result => {
          // for opening value
          tickerObject.ticker_dates[`${current_indicator_date}`][
            "opening"
          ] = parseFloat(f_result["opening"]);
          // For high value
          tickerObject.ticker_dates[`${current_indicator_date}`][
            "high"
          ] = parseFloat(f_result["high"]);
          // for low values
          tickerObject.ticker_dates[`${current_indicator_date}`][
            "low"
          ] = parseFloat(f_result["low"]);
          // For closing values
          tickerObject.ticker_dates[`${current_indicator_date}`][
            "closing"
          ] = parseFloat(f_result["closing"]);
          // For adj close values
          tickerObject.ticker_dates[`${current_indicator_date}`][
            "adjclose"
          ] = parseFloat(f_result["adjclose"]);
          // For volumes on that day
          tickerObject.ticker_dates[`${current_indicator_date}`][
            "volume"
          ] = parseFloat(f_result["volume"]);
        });
      }
    }

    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
      if (err) throw err;
      else {
        // Initializing data base to use (MONGODB)
        let database = client.db("stocks");
        database
          .collection("stocks_data")
          .insert(tickerObject, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "Data insterted for Index: ".bgWhite.red,
                tickerObject.ticker_name,
                " having id: ",
                tickerObject.ticker_id
              );
            }
          });
      }
    });
  }
}
