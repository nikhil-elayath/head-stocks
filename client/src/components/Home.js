import React, { Component } from "react";
import { allNews, newsById, getIndices } from "../actions/Home";
import { connect } from "react-redux";
import "../styles/Home.css";
import welcome from "./welcome.svg";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import loader from "./Common/Loader.gif";
import Loader from "react-loader-spinner";

export class Home extends Component {
  componentDidMount() {
    //this function calls the get News function which is defined in the actions which will retrive all the data from the news table.
    this.props.allNews();
    this.props.newsById(1);
    this.props.getIndices();
  }

  render() {
    console.log(this.props.singleNews);
    console.log(this.props.isLoading);
    return (
      <body>
        <div id="homecontainer">
          {/* <Navbar> */}
          {this.props.isLoading ? ( //use to display loader [piyush]
            <div style={{ margin: "200px 500px" }}>
              <Loader type={Loader} color="#2c3e50" height="100" width="400" />
              {/* <img src={loader} alt="loading..." /> */}
            </div>
          ) : (
            <>
              <div id="homeleftsidecontainer">
                <h1>News</h1>
                <div>
                  <div id="recent-news"></div>
                  {/* recent news */}
                  {this.props.news.map((news, index) => (
                    <div className="div-newspage">
                      <div id="news-list">
                        <p
                          id="recent-news-title"
                          onClick={() => this.props.newsById(news.new_id)}
                        >
                          {news.headline}
                        </p>
                        <p id="newsdivider">
                          <hr />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="homemiddlecontainer">
                {/* <div>
                  <h3 id="headline">{this.props.singleNews[0].headline}</h3>
                  <img
                    id="image"
                    src={
                      "data:image/jpeg;base64," +
                      this.props.singleNews[0].news_image
                    }
                  />
                  <p id="headlineDescription">
                    {this.props.singleNews[0].description}
                  </p>
                </div> */}
              </div>
              <div id="homerightsidecontainer">
                <h1>Indices</h1>
                <div>
                  <table id="homeIndicesTable">
                    <th>Indices</th>
                    <th>Last</th>
                    <th>%Chng</th>
                    {this.props.indices.map((indices, index) => (
                      <tr>
                        <td
                          id="indicesName"
                          onClick={() =>
                            this.props.history.push(
                              "/indexProfile/" + indices.ticker_id,
                              {
                                indices
                              }
                            )
                          }
                        >
                          {indices.ticker_name}
                        </td>
                        <td>
                          {Number(
                            indices.ticker_dates["2019-11-05"].closing
                          ).toFixed(2)}
                        </td>
                        <td
                          id={
                            String(
                              (indices.ticker_dates["2019-10-31"].closing -
                                indices.ticker_dates["2019-11-05"].closing) /
                                100
                            ).charAt(0) == "-"
                              ? "negativeIndex"
                              : "positiveIndex"
                          }
                        >
                          {Number(
                            (indices.ticker_dates["2019-10-31"].closing -
                              indices.ticker_dates["2019-11-05"].closing) /
                              100
                          ).toFixed(3)}
                        </td>
                      </tr>
                    ))}{" "}
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </body>
    );
  }
}

const mapStateToProps = state => ({
  news: state.homeReducer.news,
  singleNews: state.homeReducer.singleNews,
  indices: state.homeReducer.indices,
  isLoading: state.LoadingReducer.isLoading
});
export default connect(
  mapStateToProps,
  {
    allNews,
    newsById,
    getIndices
  }
)(Home);
