import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index.js";

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const peristedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,peristedState,composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
    let demoState = {};
    //let intitialMemberState = {"loading":true,"data": [],"pageNo": 1};
    demoState.currentuser   = store.getState().currentuser;
    demoState.allmembers    = {"loading":true,"data": []};
    demoState.locations     = {"loading":true,"data": []};
    demoState.teamzone      = {"loading":true,"data": []};
    demoState.jobpostion    = {"loading":true,"data": []};
    demoState.allevents     = {"loading":true,"data": []};
    demoState.allintensity  = {"loading":true,"data": []};
    demoState.locationroles = {"loading":true,"data": []};
    demoState.membercalloutstatus = {"loading":true,"data": []};
    demoState.memberinfo = {"loading":true,"data": []};
    demoState.calloutmessages = {"loading":true,"data": []};

    demoState.allroutes = {"loading":true,"data": []};
    demoState.routeslocation = {"loading":true,"data": []};
    demoState.routesrole = {"loading":true,"data": []};


    demoState.predeterimedmodelstatus = {"loading":true,"status":false};
    //saveState(store.getState());
    saveState(demoState);
});


export default store;