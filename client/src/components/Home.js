//piyush
import React, { Component } from "react";
import { allNews, newsById, getIndices } from "../actions/Home";
import { connect } from "react-redux";
import "../styles/Home.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Table from "../components/Common/TickerTable";
import Loader from "react-loader-spinner";

export class Home extends Component {
  componentDidMount() {
    //this function calls the get News function which is defined in the actions which will retrive all the data from the news table.
    this.props.allNews();
    this.props.newsById(1);
    this.props.getIndices();
  }

  render() {
    console.log(this.props.indices ? this.props.indices["0"] : "Load");
    console.log(this.props.isLoading);
    return (
      <body>
        <div id="homecontainer">
          {/* <Navbar> */}
          {this.props.indices["0"] ? ( //use to display loader [piyush]
            <>
              <div id="homeleftsidecontainer">
                <h1>Recent News</h1>
                <div>
                  <div id="recent-news"></div>
                  {/* recent news */}
                  {this.props.news.map((news, index) => (
                    <div className="div-newspage">
                      <div id="news-list">
                        <p
                          id="recent-news-title"
                          className={"recent-news-title" + index}
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
                <div>
                  {/*single news */}
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
                </div>
              </div>
              <div id="homerightsidecontainer">
                {/*for indics table */}
                <h1>Indices</h1>
                <div>
                  <Table
                    tableHeaders={["Index", "Chng%", "Last CLosed"]}
                    tableData={this.props.indices["0"].index}
                    isIndex={this.props.indices["0"].isIndex}
                  />
                </div>
              </div>
            </>
          ) : (
            <div style={{ margin: "200px 500px" }}>
              <Loader type={Loader} color="#2c3e50" height="100" width="400" />
            </div>
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
export default connect(mapStateToProps, {
  allNews,
  newsById,
  getIndices
})(Home);
