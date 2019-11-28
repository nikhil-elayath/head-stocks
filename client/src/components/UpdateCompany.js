import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/Admin.css";

import { updateCompany } from "../actions/UpdateCompany";
import SampleTable from "./Common/SampleData.png";

export class UpdateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    this.props.updateCompany(data, this.props.id);
    // console.log(this.state);
  };

  render() {
    // console.log(this.props);
    return (
      <div id="updateCompanyMainDiv">
        <a className="admin_close" href="#stocks_main_grid_container">
          &times;
        </a>
        {this.state.selectedFile != null ? (
          <p></p>
        ) : (
          <>
            <p id="updateCompanyMainDivText1">Select a File</p>
            <div id="updateCompany_tooltip_div">
              <i class="fa fa-info-circle" />
              <span id="updateCompany_tooltip_text">
                <ul className="updateCompany_tooltip_text_list">
                  <li>
                    File must be a <b>csv</b> file.
                  </li>
                  <li>
                    <b>Indicator Names</b> must be the same as used in the
                    Application.
                  </li>
                  <li>
                    Indicator Names on <b>left</b> and their Data on{" "}
                    <b>right</b>
                  </li>
                  <li>
                    Date for the data must be in ISO format
                    <b>("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")</b>.
                  </li>
                  <li>It should follow the below pattern.</li>
                </ul>
                <img
                  src={SampleTable}
                  alt="Sample Table"
                  className="updateCompany_table_image"
                />
              </span>
            </div>
          </>
        )}
        <input
          className="updateCompany_admin_input"
          style={
            this.state.selectedFile != null
              ? { padding: "12px 35px 0px 25px" }
              : { padding: "12px 35px 0px 35px" }
          }
          type="file"
          name="file"
          onChange={this.onChangeHandler}
        />

        <button
          type="button"
          className="btn btn-success btn-block updateCompany_admin_button"
          onClick={this.onClickHandler}
        >
          <i className="fa fa-upload" style={{ marginRight: "5px" }}></i>
          <a
            href="#stocks_main_grid_container"
            style={{ textDecoration: "none" }}
          >
            Upload
          </a>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //  isLoading: state.LoadingReducer.isLoading
});

export default connect(mapStateToProps, { updateCompany })(UpdateCompany);
