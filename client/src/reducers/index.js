import { currentUser,getMembers,getAccountLocations,getJobPosition,getTeamzone,getEvents,getEventIntensity,getLocationRoles,getMemberCalloutInfo,getMemberInfoById,getCalloutMessages,predeterimedModelStatus,getRoutes,getRouteLocation,getRouteRoles } from "./reducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    currentuser:currentUser,
    locations:getAccountLocations,
    teamzone:getTeamzone,
    jobpostion:getJobPosition,
    allintensity:getEventIntensity,
    locationroles:getLocationRoles,
    allevents:getEvents,
    allmembers:getMembers,
    membercalloutstatus:getMemberCalloutInfo,
    memberinfo:getMemberInfoById,
    calloutmessages: getCalloutMessages,
    predeterimedmodelstatus:predeterimedModelStatus,
    allroutes:getRoutes,
    routeslocation:getRouteLocation,
    routesrole:getRouteRoles 

});
export default rootReducer;