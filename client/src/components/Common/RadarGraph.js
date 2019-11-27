import React, { Component } from "react";
import { Polar } from "react-chartjs-2";
import { connect } from "react-redux";

export class RadarGraph extends Component {
  state = {
    marksData: {
      labels: [
        "Market Cap",
        "Net Profit",
        "Share Price",
        "Revenue",
        "Total Assets",
        "EBIT"
      ],
      datasets: [
        {
          fill: true,
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#2c3e50"
          ],

          data: this.props.data
        }
      ]
    }
  };
  render() {
    return (
      <div>
        <Polar
          options={{
            legend: false,
            labels: false,
            responsive: true
          }}
          data={this.state.marksData}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps, {})(RadarGraph);
