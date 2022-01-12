import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import CONSTANTS from "../utils/constants.js";
//import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap";

function Header(props) {
    let noLink = "#";
    let { first_name, last_name, role_details } = props.currentuser;
    let { role_name, role_id } = role_details;
    let full_name = first_name + " " + last_name;
    return (
        <React.Fragment>
            <div className="site_header clearfix" style={{ "background": 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000000 100%), url("/assets/images/bg-masthead.jpg")' }}>
                <div className="container">
                    {(role_id !== "") ? <React.Fragment><small style={{ color: "#fff", textAlign: "right", display: "inline-block", width: "100%" }}>Logged in as: {full_name} ({role_name})</small></React.Fragment> : ""}
                </div>

                <nav className="navbar navbar-expand-lg navbar-light" id="mainNav" style={{ "background": 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000000 100%), url("/assets/images/bg-masthead.jpg")' }}>

                    <div className="container">

                        <a className="navbar-brand js-scroll-trigger" href={noLink}><img src="/assets/images/logo.png" alt="" style={{ height: "75px", width: "75px" }} /><img src="/assets/images/Xlogo2.png" alt="" style={{ height: "75px", width: "150px" }} /></a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                    <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                {(role_id === "")?<React.Fragment><li className="nav-item">
                                    <NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/register">Register</NavLink>
                                    </li><li className="nav-item">
                                    <NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/">Login</NavLink>
                                    </li></React.Fragment>: ""
                                }

                                {(role_id === CONSTANTS.appUserRole)?<AppUserMenuLink />:""}
                                {(role_id === CONSTANTS.adminUserRole)? <AdminMenuLink />:""}

                                {(role_id !== "") ?<React.Fragment><li className="nav-item"><NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/logout">Logout</NavLink></li></React.Fragment>:""}
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
}

function AppUserMenuLink(props) {
    return (
        <React.Fragment>
            <li className="nav-item"><NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/profile">Profile</NavLink></li>
            <li className="nav-item"><NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/callouts">Callouts</NavLink></li>
        </React.Fragment>
    );
}

function AdminMenuLink(props) {
    return (
        <React.Fragment>
            <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/member/add">Add Team Member</NavLink>
            </li>
            <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-link js-scroll-trigger" to="/member/all"> All Team Member</NavLink>
            </li>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    //console.log("State full Data " + JSON.stringify(state));
    return {
        currentuser: state.currentuser,
        allMembers: state.allmembers,
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        //fetchProfile: (data) => { dispatch(currentUser(data)) },
        //getAllMembers: (data) => { dispatch(getMembers(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Header);