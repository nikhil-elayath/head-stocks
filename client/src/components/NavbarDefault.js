import React, { Component } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "./fakelogo.png"
import searchlogo from "./search.png"
import { connect } from "react-redux";
import { searchContent } from "../actions/Navbar";


export class NavbarDefault extends Component {
    state= {
        searchInput: "",
        home:true,
        stocks:false,
        login:false
    }

    //Displays option inside the hamburger button
    myhamburgfunction() {

        // gets the complete navbar element
        var x = document.getElementById("navbarID");
        // checks if navbar has the required className 
        if (x.className === "navbarHS") {
        // adds another className that displays navbar options
          x.className += " responsiveHS";
        } else {
          x.className = "navbarHS";
        }
      };

      OnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      onSearch = e => {
        e.preventDefault();
          let searchString = {
            searchInput: this.state.searchInput,
           };
          this.props.searchContent(searchString);
        // console.log(searchString)
          this.setState({
            searchInput: "",
          });
      };



      render() { 
        console.log(this.props);
        return (
          
                <div className="navbarHS" id="navbarID">

                    <Link to="/">

                        <div className="navbarLogoName">
                            <span className="active"
                            onClick={() =>
                                this.setState({
                                    home: false,
                                    stocks: false,
                                    login: true 
                                })
                            } >
                            <img className="navbarlogoimage" src={logo} alt="logo" width="30px" height="30px"/>
                                HEAD<b>STOCKS</b>
                            </span> 
                        </div>

                    </Link>

            
                    <div className="navbarLoginOptions">
                        <span onClick={() =>
                            this.setState({
                                home: false,
                                stocks: false,
                                login: true 
                            })
                        } 
                        className={this.state.login?"tabactive":""}>
                            <Link to="/Login" className="linkdecornone">
                            Login
                            </Link>
                        </span> 
                    </div>
                   
                   

                    <div className="navbarStockOptions"
                    >

                        <span onClick={() =>
                            this.setState({
                                home: false,
                                stocks: true,
                                login: false 
                            })
                        } 
                        className={this.state.stocks? "tabactive": ""}>
                            <Link to="/Stocks" className="linkdecornone">
                            Stocks
                            </Link>
                            
                        </span> 
                    
                    </div>

                    <div className= "navbarSearchBox">
                        <span  className= "navbarSearchSpan">
                        <input 
                        type="text" 
                        name="searchInput"
                        placeholder="Search for a company or ticker"
                        onChange={this.OnChange}
                         />
                         <button onClick={
                             this.onSearch
                         }>
                             <img src={searchlogo} alt="Search Icon" width="15px" height="15px"/>
                         </button>
                        </span>
                   </div>

                    <span className="icon" onClick={this.myhamburgfunction}>
                        <i className="fa fa-bars"></i>
                    </span>
                 
                 </div>

            
        )
    }
}

const mapStateToProps = state => ({
    results: state.navbarReducer.results
  });
  
  export default connect(
    mapStateToProps,
    { searchContent }
  )
  (NavbarDefault);
  