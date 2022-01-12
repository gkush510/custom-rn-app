
import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getMembers, allAccountLocation, allJobposition, allTeamzone, getEvents, allEventIntensity, AlLocationRoles, getMemberCallOutStatus,getAllCalloutMessage,allRoutes,routeLocation,routeRoles } from "../../actions/index.js";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import routes from "./routes.js";
import CONSTANTS from "../../utils/constants.js";

import "bootstrap/dist/css/bootstrap.css"
import "./admin-assets/scss/paper-dashboard.scss";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./admin-assets/demo/demo.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css"; 


function Header(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  let noLink = "#";
  let paginationParams = { data_limit: CONSTANTS.recordLimit, page: 1 };
  let { first_name, last_name, role_details } = props.currentuser;
  let { role_name, role_id } = role_details;
  let full_name = first_name + " " + last_name;
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();

  let allmemberDataLoading = props.allmembers.loading;
  let alleventsDataLoading = props.allevents.loading;
  let locationDataLoading = props.locations.loading;
  let jobPositionDataLoading = props.jobpostion.loading;
  let teamzoneDataLoading = props.teamzone.loading;
  let allintensityDataLoading = props.allintensity.loading;
  let locationrolesDataLoading = props.locationroles.loading;

  //let modalLoadApi = true;
  const [modalLoadApi, setModalLoadApi] = useState(false);
  const toggleLoadApi = () => setModalLoadApi(!modalLoadApi);
  const [refreshDatainfo, setrefreshDataInfo] = React.useState("Please wait while getting data from CRM...");

  React.useEffect(() => {
    let initial_data_load = localStorage.getItem("initial_data_load");
    console.log("initial_data_load",initial_data_load);
    console.log("initial_data_load typefo",typeof initial_data_load);
    if (initial_data_load === "yes") {
      setrefreshDataInfo("Please wait while getting data from CRM...");

      if (props.allmembers.loading === false && props.allevents.loading === false && props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false && props.allintensity.loading === false && props.locationroles.loading === false && props.allroutes.loading === false && props.routeslocation.loading === false && props.routesrole.loading === false ) {
        setModalLoadApi(false);
        localStorage.setItem("initial_data_load", "no");
        localStorage.removeItem("initial_data_load");
      } else {
        setModalLoadApi(true);
      }
    }
  }, [props.allmembers.loading, props.allevents.loading, props.locations.loading, props.jobpostion.loading, props.teamzone.loading, props.allintensity.loading, props.locationroles.loading,props.allroutes.loading,props.routeslocation.loading,props.routesrole.loading]);


  const refreshData = async () => {
    setrefreshDataInfo("Please wait while getting data from CRM...");
    setModalLoadApi(true);
    
    let member = await dispatch(getMembers(paginationParams));
    let event = await dispatch(getEvents(paginationParams));
    let location = await dispatch(allAccountLocation());
    let roles = await dispatch(allJobposition());
    let teamzone = await dispatch(allTeamzone());
    let intensity = await dispatch(allEventIntensity());
    let locationRoles = await dispatch(AlLocationRoles());
    let calloutMessages = await dispatch(getAllCalloutMessage());

    let allRoutesinfo = await dispatch(allRoutes());
    let routeLocationinfo = await dispatch(routeLocation());
    let routeRolesinfo = await dispatch(routeRoles());

    setModalLoadApi(false);
    setrefreshDataInfo("");
  }



  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  return (
    // add or remove classes depending if we are on full-screen-maps page or not

    <React.Fragment>

      <div>
        {/* <Button color="danger" onClick={toggleLoadApi}>Cancel</Button> */}
        <Modal isOpen={modalLoadApi} toggle={toggleLoadApi} className="gdfgdfgd">
          <ModalHeader toggle={toggleLoadApi}>CRM Data Info</ModalHeader>
          <ModalBody>
            <h4>{refreshDatainfo}</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleLoadApi}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

      <Navbar
        color={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : color
        }
        expand="lg"
        className={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            {/* <NavbarBrand href="/">{getBrand()}</NavbarBrand> */}
          </div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar className="justify-content-end">
            {/* <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form> */}
            <Nav navbar>
              <NavItem>
                <Link to="#" onClick={refreshData} className="nav-link btn-magnify">
                  <i class="fa fa-refresh"></i>
                  <p><span className="d-lg-none d-md-block">Reload Data</span></p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={(e) => dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="fa fa-user-circle" />
                  <p>
                    <span className="d-lg-none d-md-block">Accounts</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  {(role_id !== "") ? <React.Fragment><NavLink activeClassName="active" className="nav-link js-scroll-trigger" to="/logout">Logout</NavLink></React.Fragment> : ""}
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-rotate">
                  <i class="fa fa-cog"></i>
                  <p>
                    <span className="d-lg-none d-md-block">Settings</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

function AppUserMenuLink(props) {
  return (
    <React.Fragment>
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
    allmembers: state.allmembers,
    locations: state.locations,
    jobpostion: state.jobpostion,
    teamzone: state.teamzone,
    allevents: state.allevents,
    allintensity: state.allintensity,
    locationroles: state.locationroles,
    allroutes: state.allroutes,
    routeslocation: state.routeslocation,
    routesrole: state.routesrole
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    allTeamMembers: (data) => { dispatch(getMembers(data)) },
    allEvents: (data) => { dispatch(getEvents(data)) },
    allAccountLocation: () => { dispatch(allAccountLocation()) },
    allJobposition: () => { dispatch(allJobposition()) },
    allTeamzone: () => { dispatch(allTeamzone()) },  
    allEventIntensity: () => { dispatch(allEventIntensity()) },
    allLocationRoles: () => { dispatch(AlLocationRoles()) },
    allCalloutMessages: () => { dispatch(getAllCalloutMessage()) },
    allRoutesInfo: () => { dispatch(allRoutes()) },
    allRouteLocation: () => { dispatch(routeLocation()) },
    allrouteRoles: () => { dispatch(routeRoles()) }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Header);
