import React, { useState, useEffect } from "react";
//import { Link } from 'react-router-dom';
import CONSTANTS from "../utils/constants.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { connect } from "react-redux";
import {LinkTag} from "../components/Common.js";


function Register(props) {
    let successMessage = { color: "green" };
    let alignleftCSS = { textAlign: "left" };
    //let history = useHistory();
    const [fields, setFields] = useState(
        { "firstname": "", "lastname": "", "email": "" }
    );

    const [errors, setErrors] = useState(
        { "firstname": "", "lastname": "", "email": "" }
    );
    const [rMessage, setRmessage] = useState(null);
    const [rStatus, setRstatus] = useState(true);

    const registerInput = (event) => {
        let { name, value } = event.target;
        //console.log("Name:"+name+" Value:"+value);
        setFields((previousValue) => {
            return {
                ...previousValue,
                [name]: value
            }
        });
    }

    const registerusers = (dataParms) => {
        setRmessage("Sending...");
        window.scrollTo({ behavior: 'smooth', top: '0px' });
        let raw = JSON.stringify(dataParms);
        console.log("Function called registerusers", JSON.stringify(raw));
        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw
        };
        let data = {};
        fetch(CONSTANTS.url.registerUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.warn("Register API Results warn", JSON.parse(result));
                let resultData = JSON.parse(result);
                console.log("Register API Results ", resultData.status);
                if (resultData.status === 200) {
                    data.errors = { "firstname": "", "lastname": "", "email": "" };
                    data.data = {};
                    setFields(data.errors);
                    setErrors(data.errors);
                    setRmessage(resultData.message);
                    setRstatus(true);
                    //console.warn(history.push('home'))
                }
                if (resultData.status !== 200) {
                    console.warn("error by api ", JSON.parse(resultData.status));
                    setErrors(resultData.errors);
                    setRmessage(resultData.message);
                    setRstatus(false);
                }
            }).catch(error => {
                console.log('"Register API Results error', JSON.stringify(error));
                data.errors = error;
                data.data = JSON.parse(raw);
            });
    }

    //Onsubmit input
    const onRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Register Submitted Data", JSON.stringify(fields));
        registerusers(fields);
    };

    console.log("Errors validation", JSON.stringify(errors));
    console.log("Registration Message", rMessage);
    console.log("Errors object length ", Object.keys(errors).length);


    if (rStatus === false) {
        successMessage = { color: "#dc3545" };
    } else {
        successMessage = { color: "green" };
    }

    return (
        <React.Fragment>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div id="first">
                            <div className="myform form">
                                <div className="logo mb-3">
                                    <div className="col-md-12 text-center">
                                        <h1 >Signup</h1>
                                        {
                                            ((rMessage != null)) ? <h4 style={successMessage} id="successM" >{rMessage}</h4> : ""
                                        }
                                    </div>
                                </div>
                                <form onSubmit={onRegisterSubmit} method="post" name="registration">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFirstname">First Name</label>
                                        <input type="text" name="firstname" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter Firstname" onChange={registerInput} value={fields.firstname} />
                                        {
                                            ((errors != null) && (errors.firstname != null)) ? <small style={alignleftCSS} id="errorsFirstname" className="text-danger">{errors.firstname}</small> : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputLastname">Last Name</label>
                                        <input type="text" name="lastname" className="form-control" id="lastname" aria-describedby="lastnameHelp" placeholder="Enter Lastname" onChange={registerInput} value={fields.lastname} />
                                        {
                                            ((errors != null) && (errors.lastname != null)) ? <small style={alignleftCSS} id="errorsFirstname" className="text-danger">{errors.lastname}</small> : ""
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" onChange={registerInput} value={fields.email} />
                                        {
                                            ((errors != null) && (errors.email != null)) ? <small style={alignleftCSS} id="errorsFirstname" className="text-danger">{errors.email}</small> : ""
                                        }
                                    </div>
                                    <div className="form-button text-center mb-3">
                                        <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Register</button>
                                    </div>
                                    <div className="col-md-12 ">
                                        <div className="form-group">
                                            <p className="text-center">
                                                <LinkTag path="/" name="Already have an account?" classes="" />
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

const Login = (props) => {

    useEffect(() => {
        // localStorage.removeItem("state");
        // localStorage.removeItem("current_user");
        // let loginScript = document.createElement("script");
        // let filesrc = `${process.env.PUBLIC_URL}/assets/js/catalyst_loginout.js`;
        // loginScript.src = `${process.env.PUBLIC_URL}/assets/js/catalyst_loginout.js`;
        // document.body.appendChild(loginScript);
        // console.log('Login User Effect called all time',filesrc);
      },[]);

    return (
        <React.Fragment>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div id="first">
                            <div className="myform form ">
                                <div className="logo mb-3">
                                    <div className="col-md-12 text-center">
                                        <h1>Login</h1>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}


function Logout(props) {

    useEffect(() => {
        let logOutScript = document.createElement("script");
        let filesrc = `${process.env.PUBLIC_URL}/assets/js/catalyst_loginout.js`;
        logOutScript.src = `${process.env.PUBLIC_URL}/assets/js/catalyst_loginout.js`;
        document.body.appendChild(logOutScript);
        console.log('Logout User Effect called all time',filesrc);
      },[]);
    return (
        <React.Fragment></React.Fragment>
    );
}


const mapStateToProps = (state) => {
    //console.log("All State Data " + JSON.stringify(state));
    return {}
}

const mapDispatchToprops = (dispatch) => {
    return {}
}

let LoginEx = connect(mapStateToProps, mapDispatchToprops)(Login);
let RegisterEx = connect(mapStateToProps, mapDispatchToprops)(Register);
export { RegisterEx, LoginEx, Logout };


