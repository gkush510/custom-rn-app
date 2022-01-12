import React from "react";
import { Route, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import DemoNavbar from "./Header.js";
import Footer from "./Footer.js";
import Sidebar from "./Sidebar.js";
//import {EditMemberEx} from './Users.js';
//import {EditEventsEx,EventsInfoEx,EventsCalloutListingEx,EventsRouteInfoEx} from './Events.js';
//import FixedPlugin from "./FixedPlugin.js";
import routes from "./routes.js";
//import { ViewCallOutInfoEx } from '../users/MemberActions.js';

var ps;

function Dashboard(props) {
    const [backgroundColor, setBackgroundColor] = React.useState("black");
    const [activeColor, setActiveColor] = React.useState("info");
    const mainPanel = React.useRef();
    const location = useLocation();
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current);
            document.body.classList.toggle("perfect-scrollbar-on");
        }
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                document.body.classList.toggle("perfect-scrollbar-on");
            }
        };
    });
    React.useEffect(() => {
        mainPanel.current.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);
    
    // const handleActiveClick = (color) => {
    //     setActiveColor(color);
    // };
    // const handleBgClick = (color) => {
    //     setBackgroundColor(color);
    // };
    return (
        <div className="wrapper">
            <Sidebar
                {...props}
                routes={routes}
                bgColor={backgroundColor}
                activeColor={activeColor}
            />
            <div className="main-panel" ref={mainPanel}>
                <DemoNavbar {...props} />
                    {routes.map((prop, key) => {
                        return (

                            <Route 
                                path={prop.layout + prop.path}
                                component={prop.component}
                                key={key}
                            />

                        );
                    })}
                    {/*
                    <Route path="/admin/member/edit/:id" component={EditMemberEx} key="edm1" name="Edit Member" /> 
                    <Route path="/admin/event/edit/:id" component={EditEventsEx} key="edm2" name="Edit Event" />
                    <Route path="/admin/event/calloutlist/:eventid" component={EventsCalloutListingEx} key="edm2" name="Edit Event" />
                    <Route path="/admin/event/view/:id/:calloutid/:crm_event_intensity" component={EventsInfoEx} key="edm3" name="Event Details" />
                    <Route path="/admin/event/accept/:id" component={ViewCallOutInfoEx} key="edm4" name="Event Details" />
                    <Route path="/admin/event-route/view/:id/:calloutid/:crm_event_intensity" component={EventsRouteInfoEx} key="edm4" name="Event Route Details" />
                    */}
                <Footer fluid />
            </div>

        </div>
    );
}
/*<FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />*/
export default Dashboard;