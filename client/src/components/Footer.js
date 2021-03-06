import React from "react";
//import {useSelector,useDispatch} from "react-redux";

function Footer(props){
    let noLink = "#";
    return (
        <React.Fragment>
            <section className="contact-section bg-black">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                                    <h4 className="text-uppercase m-0">Address</h4>
                                    <hr className="my-4" />
                                    <div className="small text-black-50">4923 Market Street, Orlando FL</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-envelope text-primary mb-2"></i>
                                    <h4 className="text-uppercase m-0">Email</h4>
                                    <hr className="my-4" />
                                    <div className="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-mobile-alt text-primary mb-2"></i>
                                    <h4 className="text-uppercase m-0">Phone</h4>
                                    <hr className="my-4" />
                                    <div className="small text-black-50">+1 (555) 902-8832</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="social d-flex justify-content-center">
                        <a className="mx-2" href={noLink}><i className="fab fa-twitter"></i></a>
                        <a className="mx-2" href={noLink}><i className="fab fa-facebook-f"></i></a>
                        <a className="mx-2" href={noLink}><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </section>
            <footer className="footer bg-black small text-center text-white-50"><div className="container">Copyright &copy; Your Website 2021</div></footer>
        </React.Fragment>
    )
}
export default Footer;