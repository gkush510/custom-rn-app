import React from "react";
import {BrowserRouter,HashRouter, Route, Switch} from 'react-router-dom';
import store from "./store.js";
import { Provider } from "react-redux";
import {NotFound404} from "./components/Common.js";
import { RegisterEx,LoginEx, Logout } from './components/Auth.js';
import AdminLayout from "./components/admin/Admin.js";

function App() {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <div className="App">
          <Switch>
            {/*Comman Routes*/}
            <Route exact path="/" render={() => <LoginEx name="Login" />} />
            <Route exact path="/register" render={() => <RegisterEx name="Register" />} />
            
            <Route exact path="/404" render={() => <NotFound404 title="404" message="OPPS page not found." />} />
            <Route exact path="/logout" render={() => <Logout />} /> 
            
            {/*Admin Routes*/}
            {/* <AdminProtectedEX  path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
            
            {/*User Routes*/}
            {/* <ProtectedEx exact path="/callouts" render={() => <ViewCallOutListingEx name="All Callout" />} />
            <ProtectedEx exact path="/profile" render={() => <ProfileEx name="Profile" />} />
            <ProtectedEx exact path="/accept-callout/:id" render={() => <ViewCallOutInfoEx name="Callout Details" />} /> */}
            

          </Switch>
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
