let intialCurrentUser ={"loading":true,"role_details":{"role_id":""}};
const currentUser = (state =intialCurrentUser, action) => {
  switch (action.type) {
    case "CURRENTUSER":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}
let intitialState = {"loading":true,"data": [],"pageNo": 1};
const getMembers = (state = intitialState, action) => {
  switch (action.type) {
    case "GETMEMBERS":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialLocation = {"loading":true,"data": []};
const getAccountLocations = (state = intitialLocation, action) => {
  switch (action.type) {
    case "ACCOUNTLOCATION":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialJobPostion = {"loading":true,"data": []};
const getJobPosition = (state = intitialJobPostion, action) => {
  switch (action.type) {
    case "JOBPOSITION":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialTeamzone = {"loading":true,"data": []};
const getTeamzone = (state = intitialTeamzone, action) => {
  switch (action.type) {
    case "TEAMZONE":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialEvents = {"loading":true,"data": []};
const getEvents = (state = intitialEvents, action) => {
  switch (action.type) {
    case "GETEVENTS":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialIntensity = {"loading":true,"data": []};
const getEventIntensity = (state = intitialIntensity, action) => {
  switch (action.type) {
    case "EVENTINTENSITY":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialLocationRoles = {"loading":true,"data": []};
const getLocationRoles = (state = intitialLocationRoles, action) => {
  switch (action.type) {
    case "LOCATIONROLES":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialMemberCalloutStatus = {"loading":true,"data": []};
const getMemberCalloutInfo = (state = intitialMemberCalloutStatus, action) => {
  switch (action.type) {
    case "MEMBERCALLOUTSTATUS":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let intitialMemberInfoById = {"loading":true,"data": {}};
const getMemberInfoById = (state = intitialMemberInfoById, action) => {
  switch (action.type) {
    case "MEMBERINFOBYID":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}


let intitialCalloutMessages = {"loading":true,"data": {}};
const getCalloutMessages = (state = intitialCalloutMessages, action) => {
  switch (action.type) {
    case "CALLOUTMESSAGES":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let predeterimedModelMessage = {"loading":true,"status": false};
const predeterimedModelStatus = (state = predeterimedModelMessage, action) => {
  switch (action.type) {
    case "PREDETERIMEDMODELSTATUS":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let routesMessage = {"loading":true,"status": false};
const getRoutes = (state = routesMessage, action) => {
  switch (action.type) {
    case "ROUTES":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let routesLocationMessage = {"loading":true,"status": false};
const getRouteLocation = (state = routesLocationMessage, action) => {
  switch (action.type) {
    case "ROUTELOCATION":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

let routesRolesMessage = {"loading":true,"status": false};
const getRouteRoles = (state = routesRolesMessage, action) => {
  switch (action.type) {
    case "ROUTEROLES":
      return {...state, ...action.payload,"loading":false};
    case "NONE":
      return {};
    default:
      return state;
  }
}

export {currentUser,getMembers,getAccountLocations,getJobPosition,getTeamzone,getEvents,getEventIntensity,getLocationRoles,getMemberCalloutInfo,getMemberInfoById,getCalloutMessages,predeterimedModelStatus,getRoutes,getRouteLocation,getRouteRoles};