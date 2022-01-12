import Dashboard from "./Dashboard.js";
//import { AddUsersEx,TeamMemberListingEx} from './Users.js';
//import { AddEventsEx,EventsListingEx,AddRouteEventsEx} from './Events.js';
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-university",
    component: Dashboard,
    layout: "/admin",
  }
];
export default routes;
{/*
{
    path: "/member/all",
    name: "All Members",
    icon: "fa fa-users",
    component: TeamMemberListingEx,
    layout: "/admin",
  },
  {
    path: "/member/add",
    name: "Add Members",
    icon: "fa fa-user-plus",
    component: AddUsersEx,
    layout: "/admin",
  },
  {
    path: "/event/all",
    name: "All Events",
    icon: "fa fa-calendar-o fa-plus",
    component: EventsListingEx,
    layout: "/admin",
  },
  {
    path: "/event/add",
    name: "Add Events Callout",
    icon: "fa fa-calendar-o",
    component: AddEventsEx,
    layout: "/admin",
  },
  {
    path: "/event-route/add",
    name: "Add Events Route Callout",
    icon: "fa fa-calendar-o",
    component: AddRouteEventsEx,
    layout: "/admin",
  }

*/}
