import React, { Component } from 'react'
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "./fakelogo.png"
 
export default class NavbarDefault extends Component {

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

    // showActive() {
    //     document.getElementById('navbarActive').style.display = "block";
    //  }
     

    render() { 
        return (
    
                <div className="navbarHS" id="navbarID">

                    <Link to="/Headstocks">

                        <div className="navbarLogoName">
                            <span className="active">
                            <img className="navbarlogoimage" src={logo} alt="logo" width="30px" height="30px"/>
                                HEAD<b>STOCKS</b>
                            </span> 
                        </div>

                    </Link>

            
                    <div className="navbarLoginOptions">
                        <span>
                            <Link to="/Login" className="linkdecornone">
                            Login
                            </Link>
                        </span> 
                    </div>
                   
                   

                    <div className="navbarStockOptions" 
                    // onClick={this.showActive}
                    >

                        <span>
                            <Link to="/StocksHome" className="linkdecornone">
                            Stocks
                            </Link>
                            {/* <div id="navbarActive"  style={{display:"none"}} class="answer_list" >
                            <hr style= {{
                                backgroundcolor:"#39abf7",
                                width: "65px", 
                                padding: "0px",
                                margin: "0px",
                                border: "1.5px solid #39abf7"}}
                                />
                            </div> */}
                        </span> 
                    
                    </div>

                    <div className= "navbarSearchBox">
                        <span  className= "navbarSearchSpan">
                        <input 
                        type="text" 
                        placeholder="Search for a company or ticker"
                         />
                        </span>
                   </div>

                    <span className="icon" onClick={this.myhamburgfunction}>
                        <i className="fa fa-bars"></i>
                    </span>
                
                   
                    

{/* <input type="button" name="answer" value="Show Div" onClick={this.showActive} /> */}
                </div>

            
        )
    }
}
