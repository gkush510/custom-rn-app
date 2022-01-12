import CONSTANTS from "../utils/constants.js";
import { objToSerialize } from "../utils/functions.js";
//headers: { "Content-Type": "application/json" }
export const currentUser = (dataParms) => {
  return async (dispatch) => {
    let requestType = "CURRENTUSER";
    let data = {};

    var requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    };

    let responseData = await fetch(CONSTANTS.url.currentUserUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        //dispatch({ type: requestType, payload: result.data })
        return result;
      })
      .catch(error => {
        console.log('error CURRENTUSER', error);
        //dispatch({ type: requestType, payload: data })
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData.data })
    } else {
      return dispatch({ type: requestType, payload: data })
    }
  }
}

export const getMembers = (dataParms) => {
  return async (dispatch) => {

    //let requestType  = dataParms.type;
    let requestType = "GETMEMBERS";
    let data = {};
    let myHeaders = {
      "Content-Type": "application/json"
    };
    let queryStringObj = { "page": dataParms.page, "data_limit": dataParms.data_limit };
    delete dataParms.page;
    delete dataParms.data_limit;

    let raw = JSON.stringify(dataParms);
    let queryString = objToSerialize(queryStringObj);

    var requestOptions = { method: 'POST', headers: myHeaders, body: raw };

    let responseData = await fetch(CONSTANTS.url.getAllMemberUrl + "?" + queryString, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error GETMEMBERS', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData })
    } else {
      return dispatch({ type: requestType, payload: data })
    }
  }
}

export const getEvents = (dataParms) => {
  return async (dispatch) => {
    let requestType = "GETEVENTS";
    let data = {};
    let queryStringObj = { "page": dataParms.page, "data_limit": dataParms.data_limit };
    delete dataParms.page;
    delete dataParms.data_limit;
    let queryString = objToSerialize(queryStringObj);
    var requestOptions = { method: 'GET' };

    let responseData = await fetch(CONSTANTS.url.getAllEventUrl + "?" + queryString, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      }).catch(error => {
        console.log('error GETEVENTS', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData })
    } else {
      return dispatch({ type: requestType, payload: data })
    }
  }
}

export const crmLeads = () => {
  return async (dispatch) => {

    let requestType = "CRMLEADS";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllLeads, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error CRMLEADS', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData })
    } else {
      return dispatch({ type: requestType, payload: data })
    }
  }
}

export const allAccountLocation = () => {
  return async (dispatch) => {
    let requestType = "ACCOUNTLOCATION";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllAccountLocation, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error ACCOUNTLOCATION', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const allJobposition = () => {
  return async (dispatch) => {

    let requestType = "JOBPOSITION";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllJobPosition, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error JOBPOSITION', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const allTeamzone = () => {
  return async (dispatch) => {

    let requestType = "TEAMZONE";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllTeamZone, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error TEAMZONE', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const allEventIntensity = () => {
  return async (dispatch) => {

    let requestType = "EVENTINTENSITY";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllEventIntensity, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error EVENTINTENSITY', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const AlLocationRoles = () => {
  return async (dispatch) => {

    let requestType = "LOCATIONROLES";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmLocationRoles, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error LOCATIONROLES', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const getAllCalloutMessage = () => {
  return async (dispatch) => {

    let requestType = "CALLOUTMESSAGES";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllCalloutMessage, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error CALLOUTMESSAGES', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const getMemberCallOutStatus = (dataParms) => {
  return async (dispatch) => {

    let requestType = "MEMBERCALLOUTSTATUS";
    let data = {};
    let queryStringObj = { "id": dataParms.id };
    let queryString = objToSerialize(queryStringObj);
    var requestOptions = { method: 'GET' }
    let responseData = await fetch(CONSTANTS.url.getMemberCallOut + "?" + queryString, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error MEMBERCALLOUTSTATUS', error)
        return "";
      });
    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const predeterimedModel = (status) => {
  return (dispatch) => { dispatch({ type: "PREDETERIMEDMODELSTATUS", payload: { "status": status } }); }
}


export const getMemberInfoById = (params) => {
  return async (dispatch) => {

    let raw = JSON.stringify(params);
    let requestType = "MEMBERINFOBYID";
    let data = {};
    var requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: raw
    }

    let responseData = await fetch(CONSTANTS.url.memberInfo, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error MEMBERINFOBYID', error)
        return "";
      });
    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}


export const getLocationById = (idVal) => {
  return async (dispatch) => {

    //let raw = JSON.stringify(params);
    let requestType = "LOCATIONBYID";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.getLocationById + "?id=" + idVal, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error LOCATIONBYID', error)
        return "";
      });
    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const getTeamzoneById = (idVal) => {
  return async (dispatch) => {

    //let raw = JSON.stringify(params);
    let requestType = "TEAMZONEBYID";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.getTeamzoneById + "?id=" + idVal, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error TEAMZONEBYID', error)
        return "";
      });
    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const getJobPositionById = (idVal) => {
  return async (dispatch) => {

    //let raw = JSON.stringify(params);
    let requestType = "JOBPOSITIONBYID";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.getJobPositionById + "?id=" + idVal, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error JOBPOSITIONBYID', error)
        return "";
      });
    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}


export const allRoutes = () => {
  return async (dispatch) => {
    let requestType = "ROUTES";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmAllRoutes, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error ROUTES', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const routeLocation = () => {
  return async (dispatch) => {
    let requestType = "ROUTELOCATION";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmRouteLocation, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error ROUTELOCATION', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}

export const routeRoles = () => {
  return async (dispatch) => {
    let requestType = "ROUTEROLES";
    let data = {};
    var requestOptions = { method: 'GET' }

    let responseData = await fetch(CONSTANTS.url.crmRouteRoles, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error ROUTEROLES', error)
        return "";
      });

    if (responseData !== "") {
      return dispatch({ type: requestType, payload: responseData });
    } else {
      return dispatch({ type: requestType, payload: data });
    }
  }
}