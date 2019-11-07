const url = "mongodb://localhost:27017/stockit";
let MongoClient = require("mongodb").MongoClient;

const pgp = require("pg-promise")();
const postdb = pgp("postgres://postgres:root@localhost:5432/stockit");
let dbo;

MongoClient.connect(url, {
    useNewUrlParser: true
});


const simfin = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true
    },
    Ticker: {
        type: String,
        required: true,
    },
    SimfinID: {
        type: Number,
        required: true,
    },
    Company: {
        type: Number,
        required: true,
    },
    Sector: {
        type: Number,
        required: true,
    },
    IndicatorName: {
        type: String,
    },
    dates: {
        type: Date
    },
    IndicatorValue: {
        type: Number
    },
    // yahoomail:[{type: Schema.Types.ObjectId, ref:'YahooMail'}]
})
const getSimfindata = db