import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { currentUser, getMembers, allAccountLocation, allJobposition, allTeamzone, getEvents, allEventIntensity, AlLocationRoles, getMemberCallOutStatus, getMemberInfoById, getAllCalloutMessage,allRoutes,routeLocation,routeRoles} from "../actions/index.js";
import CONSTANTS from "../utils/constants.js";

function LoginRedirect(props) {
    let history = useHistory();
    let dispatch = useDispatch();
    let paginationParams = { data_limit: CONSTANTS.recordLimit, page: 1 };
    let currentUserLoading = "Please wait while redirecting....";

    useEffect(() => {
        fetchCurrentUser();
        console.log('LoginRedirect page loads');
    }, []);

    const fetchCurrentUser = async () => {
        //props.fetchProfile();
        let loggedinuser = await dispatch(currentUser({ "test": "fgdfgdf" }));
        console.log("loggedinuser data", loggedinuser);
        if (loggedinuser !== "") {
            let curentuserData = loggedinuser.payload;
            console.log("curentuserData data", curentuserData);
            await dispatch(getMemberInfoById({ "member_id": curentuserData.user_id }));
        }
    }
    console.log("props ", props);

    if (props.currentuser.loading === false) {

        let { role_id } = props.currentuser.role_details;
        console.log('LoginRedirect page loads loading false');
        localStorage.setItem("current_user", JSON.stringify(props.currentuser));
        localStorage.setItem("initial_data_load", "yes");

        if (role_id === CONSTANTS.appUserRole) {
            // app user redirect
            console.log('LoginRedirect page loads current role', role_id);
            props.allAccountLocation();
            props.allJobposition();
            props.allTeamzone();
            props.getEvents();
            props.allEventIntensity();
            props.allCalloutMessages();
            history.push("/profile");

        } else if (role_id === CONSTANTS.adminUserRole) {
            // admin user redirect
            props.allTeamMembers(paginationParams);
            props.getEvents(paginationParams);
            props.allAccountLocation();
            props.allJobposition();
            props.allTeamzone();
            props.allLocationRoles();
            props.allEventIntensity();
            //props.allMemberCalloutStatus();
            props.allCalloutMessages();

            props.allRoutesInfo();
            props.allRouteLocation();
            props.allrouteRoles();

            console.log('LoginRedirect page loads current role', role_id);
            history.push("/admin/dashboard");
        } else {
            console.log('LoginRedirect page loads current role default', role_id);
            // profile page
            // props.allAccountLocation();
            // props.allJobposition();
            // props.allTeamzone();
            // props.getEvents();
            // props.allEventIntensity();
            history.push("/profile");
        }
    }
    return (
        <React.Fragment>
            <h2>{currentUserLoading}</h2>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        currentuser: state.currentuser,
        allmembers: state.allmembers,
        memberinfo: state.memberinfo
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        fetchProfile: (data) => { dispatch(currentUser(data)) },
        allTeamMembers: (data) => { dispatch(getMembers(data)) },
        getEvents: (data) => { dispatch(getEvents(data)) },
        allAccountLocation: () => { dispatch(allAccountLocation()) },
        allJobposition: () => { dispatch(allJobposition()) },
        allTeamzone: () => { dispatch(allTeamzone()) },

        allEventIntensity: () => { dispatch(allEventIntensity()) },
        allLocationRoles: () => { dispatch(AlLocationRoles()) },
        allMemberCalloutStatus: () => { dispatch(getMemberCallOutStatus()) },
        memberInfoById: (params) => { dispatch(getMemberInfoById(params)) },
        allCalloutMessages: () => { dispatch(getAllCalloutMessage()) },
        allRoutesInfo: () => { dispatch(allRoutes()) },
        allRouteLocation: () => { dispatch(routeLocation()) },
        allrouteRoles: () => { dispatch(routeRoles()) }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(LoginRedirect);

