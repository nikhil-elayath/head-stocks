import React from "react";
import { downloadOhlcDataCompany } from "../actions/CompanyDetail";
import { connect } from "react-redux";

class Download extends React.Component {
  state = {
    ticker_name: "AAPL"
  };
  render() {
    return (
      <div id="container" style={{ margin: "20px" }}>
        {/*example for the doenload comapny date on button click */}
        <button
          type="button"
          onClick={async () => {
            fetch(
              "http://localhost:2001/api/companydetail/downloadohlc/" +
                this.state.ticker_name
            ).then(response => {
              response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = "AAPL.csv";
                a.click();
              });
              //window.location.href = response.url;
            });
            // this.props.downloadOHLC("AAPL");
          }}
        >
          ohlc Download
        </button>
        <br />
        <br />

        <button
          type="button"
          onClick={async () => {
            fetch(
              "http://localhost:2001/api/companydetail/download/" +
                this.state.ticker_name
            ).then(response => {
              response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = "AAPL.csv";
                a.click();
              });
              //window.location.href = response.url;
            });
            // this.props.downloadOHLC("AAPL");
          }}
        >
          indcator Download
        </button>
      </div>
    );
  }
}

export default connect(null, { downloadOhlcDataCompany })(Download);
