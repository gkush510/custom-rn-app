import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from "react-redux";
import CONSTANTS from "../utils/constants.js";
import {stringToObj} from "../utils/functions.js";


const Protected = ({ render: Cmp, ...rest }) => {

    let localUser = localStorage.getItem('current_user');
    //console.log("Protected local UserData", localUser);
    let localUserRoleId = "";
    let currentUserRoleId = "";
    if ((typeof localUser !==undefined  && localUser !== null) && (rest.hasOwnProperty("currentuser"))) {

        if (rest.currentuser.hasOwnProperty('role_details')) {
            let currentUserRole = rest.currentuser.role_details;
            if (currentUserRole.hasOwnProperty("role_id")) {
                currentUserRoleId = currentUserRole.role_id;
            }
        }
        localUser = stringToObj(localUser);
        if (localUser.hasOwnProperty('role_details')) {
            let localUserRole = localUser.role_details;
            if (localUserRole.hasOwnProperty("role_id")) {
                localUserRoleId = localUserRole.role_id;
            }
        }
    }

    //console.log("Before Protected Protected component load", currentUserRoleId);
    //console.log("Before Protected Protected component LocalStorage ", localUserRoleId);

    if((localUserRoleId !== currentUserRoleId) || (localUserRoleId==="" && currentUserRoleId==="" ) ){
        localStorage.setItem("current_user",JSON.stringify(rest.currentuser));
        localUserRoleId = currentUserRoleId;
    }

    //console.log("Protected Protected component load", currentUserRoleId);
    //console.log("Protected Protected component LocalStorage ", localUserRoleId);


    return (
        <Route
            {...rest}
            render={(props) =>
                (localUserRoleId !=="" && localUserRoleId === CONSTANTS.appUserRole) ? ((<Cmp {...props} />)) :
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
            }
        />
    );
}

const AdminProtected = ({ render: Cmp, ...rest }) => {

    let localUser = localStorage.getItem('current_user');
    let localUserRoleId = "";
    let currentUserRoleId = "";
    if ((typeof localUser !== undefined && localUser !== null) && (rest.hasOwnProperty("currentuser"))) {

        if (rest.currentuser.hasOwnProperty('role_details')) {
            let currentUserRole = rest.currentuser.role_details;
            if (currentUserRole.hasOwnProperty("role_id")) {
                currentUserRoleId = currentUserRole.role_id;
            }
        }
        localUser = stringToObj(localUser);
        //console.log("AdminProtected localUSer", JSON.stringify(localUser));
        if (localUser.hasOwnProperty('role_details')) {
            let localUserRole = localUser.role_details;
            if (localUserRole.hasOwnProperty("role_id")) {
                localUserRoleId = localUserRole.role_id;
            }
        }
    }

    if((localUserRoleId !== currentUserRoleId) || (localUserRoleId==="" && currentUserRoleId==="" )){
        localStorage.setItem("current_user",JSON.stringify(rest.currentuser));
        localUserRoleId = currentUserRoleId;
        console.log("both empty localUSer "+localUserRoleId, currentUserRoleId);
    }

    //console.log("AdminProtected Protected Protected component load", currentUserRoleId);
    //console.log("AdminProtected Protected component LocalStorage ", localUserRoleId);
    return (
        <Route
            {...rest}
            render={(props) =>
                (localUserRoleId !=="" && localUserRoleId === CONSTANTS.adminUserRole) ? (
                    (<Cmp {...props} />)
                ) : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            }
        />
    );
}

const mapStateToProps = (state) => {
    //console.log("All State Data " + JSON.stringify(state));
    return {
        currentuser: state.currentuser,
    }
}


let ProtectedEx = connect(mapStateToProps, null)(Protected);
let AdminProtectedEX = connect(mapStateToProps, null)(AdminProtected);
export { ProtectedEx, AdminProtectedEX }

