import React, { Component } from 'react'
import { connect } from "react-redux";

import { updateCompany } from "../actions/Navbar";

export class UpdateCompany extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      } 

      onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0]
          })
    }
    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)

        this.props.updateCompany(data);
        console.log(this.state);
    }

    render() {
        // console.log(this.props)
        return (
            <div> 
                              <p ><b>Upload File</b></p>
                              <input type="file" name="file" onChange={this.onChangeHandler}/>
                              <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    //  isLoading: state.LoadingReducer.isLoading
   });
  
  export default connect(
    mapStateToProps,
    { updateCompany }
  )(UpdateCompany); 