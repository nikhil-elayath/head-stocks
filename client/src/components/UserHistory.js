//piyush
import React, { Component } from "react";
import "../styles/UserHistory.css";
import UserNavigation from "./Common/UserNavigation";
import { connect } from "react-redux";
import { userHistory } from "../actions/Users";
import jwt_decode from "jwt-decode";
// for user to see the history of hid stock buy and sell

export class UserHistory extends Component {
  componentDidMount() {
    var decode = jwt_decode(localStorage.getItem("token"));

    this.props.userHistory(decode.email);
  }
  render() {
    console.log(this.props.userhistory);
    return (
      <div>
        <div id="userHistoryContainer">
          <UserNavigation />
          {/*side bar for user detail*/}
          <div id="userhistory">
            <h1>History!</h1>
            <table id="userhistory_table"></table>

            <thead id="userhistory_tableHeader">
              <tr>{this.props.userHistory.map()}</tr>
            </thead>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userhistory: state.usersReducer.userhistory,
  isLoading: state.LoadingReducer.isLoading
});
export default connect(mapStateToProps, {
  userHistory
})(UserHistory);
