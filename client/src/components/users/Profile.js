import React, { useState, useEffect } from "react";
import CONSTANTS from "../../utils/constants.js";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { connect } from "react-redux";
import { Tab, Nav } from "react-bootstrap";
import { currentUser } from "../../actions/index.js";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";

function Profile(props) {

  const [key, setKey] = useState('home');
  let loadText = "Loading....";
  useEffect(() => {
    //props.fetchProfile();

    // let notificationScript = document.createElement("script");
    // let pushnotificationsrc = `${process.env.PUBLIC_URL}/assets/js/push_notification.js`;
    // notificationScript.src = `${process.env.PUBLIC_URL}/assets/js/push_notification.js`;
    // document.body.appendChild(notificationScript);
    // console.log('pushnotificationsrc all time', pushnotificationsrc);


  }, []);

  //console.log("default data redux "+JSON.stringify(props.profileData));
  if (props.profileData.loading === false) {
    loadText = '';
  }
  let profileInfo = props.profileData;
  let full_name = profileInfo.first_name + " " + profileInfo.last_name;
  return (
    <React.Fragment>
      <Header />
      <header className="masthead" style={{ "background": "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000000 100%), url(\"../assets/images/bg-masthead.jpg\")" }}>
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1 className="mx-auto my-0 text-uppercase">{props.name}</h1>
          </div>
        </div>
      </header>
      <div className="container top emp-profile" style={{ margin: "30px auto" }}>

        <Tab.Container defaultActiveKey="home" activeKey={key} onSelect={key => setKey(key)}>
          <form method="post">
            <div className="row">
              {/* <div className="col-md-4">
                <div className="profile-img">
                  <img src={(profileInfo.profile_pic) ? profileInfo.profile_pic : defaultUserImage} alt="" width="275" height="275" /> 
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="profile-head">
                  <h2>{loadText}</h2>
                  <h5><b>{full_name}</b></h5>
                  <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                    <Nav.Item>
                      <Nav.Link className={key === 'home' ? "active" : "inactive"} eventKey="home"  >About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      {/* <Nav.Link eventKey="address" className={key === 'address' ? "active" : "inactive"}>Other Infomation</Nav.Link> */}
                    </Nav.Item>
                  </ul>
                </div>
                <div className="profile-content mt-4">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <Tab.Content>
                      <Tab.Pane eventKey="home">


                        <div className="row">
                          <div className="col-md-6">
                            <label><b>Name:</b></label>
                          </div>
                          <div className="col-md-6">
                            <p>{full_name}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label><b>Email:</b></label>
                          </div>
                          <div className="col-md-6">
                            <p>{profileInfo.email_id}</p>
                          </div>
                        </div>


                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </div>
              {/*  <div className="col-md-2">
                <LinkTag path={`/profile/edit`} name="Edit Profile" classes="profile-edit-btn" /> 
              </div>
              */}
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">

                </div>
              </div>

            </div>
          </form>
        </Tab.Container>
      </div>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  //console.log("State full Data " + JSON.stringify(state));
  return {
    profileData: state.currentuser
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    fetchProfile: (data) => { dispatch(currentUser(data)) }
  }
}

let ProfileEx = connect(mapStateToProps, mapDispatchToprops)(Profile);
export { ProfileEx };

