import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { currentUser, allAccountLocation, allJobposition, allTeamzone, getEvents, allEventIntensity, getMemberInfoById, getAllCalloutMessage } from "../../actions/index.js";
import CONSTANTS from "../../utils/constants.js";
import { objToSerialize } from "../../utils/functions.js";
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import _lodash from "lodash";

function ViewCallOutInfo(props) {
    let history = useHistory();
    const { id } = useParams();
    let dispatch = useDispatch();
    const [loginMemberData, setLoginMemberData] = useState({});
    const [acceptMessage, setAcceptMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("Loading information....");
    const [crmAppDataloading, setCrmAppDataloading] = useState("");
    const [acceptMessageClass, setAcceptMessageClass] = useState("");


    const [crmjobPosition, setCrmJobPosition] = useState([]);
    const [crmTeamzone, setCrmTeamzone] = useState([]);
    const [crmLocation, setCrmLocation] = useState([]);
    const [crmCalloutMessages, setCrmCalloutMessages] = useState([]);

    const [fields, setFields] = useState({});
    let dataValue = {};

    //page routing
    useEffect(() => {
        console.log('CallOutListing page loads');
        setLoadingMessage("Loading information....");
        getData(null);
        setData(null);
        console.log("useEffect getCRMDataCount", getCRMDataCount());
        if (getCRMDataCount() === false) {
            setCrmAppDataloading("Something went wrong please visit page again...");
        } else {
            setCrmAppDataloading("");
        }
    }, []);

    //page reload
    useEffect(() => {
        setLoadingMessage("Loading information....");
        setData(null);
        if (getCRMDataLoadingStatus() === true) {
            setLoadingMessage("");
        }
        if (getCRMDataCount() === false) {
            setCrmAppDataloading("Something went wrong please visit page again...");
        } else {
            setCrmAppDataloading("");
        }

    }, [props.memberinfo.loading, props.locations.loading, props.jobpostion.loading, props.teamzone.loading, props.calloutmessages.loading]);

    useEffect(() => {
        if (loginMemberData.hasOwnProperty('ROWID') === true) {
            //call data on member info load
            fetchCalloutDetails();
        }
    }, [loginMemberData])


    const fetchCalloutDetails = async () => {
        let loginMemberInfo = props.memberinfo.data;
        let params = { "id": id, "member_id": loginMemberInfo.ROWID };
        console.log('inside fetchCalloutDetails');
        let raw = JSON.stringify(params);
        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw
        };
        let res = await fetch(CONSTANTS.url.memberCalloutDetails, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("fetchCalloutDetails success", result);
                    return result;
                }, (error) => {
                    //setloadingMembers("");
                    console.log("fetchCalloutDetails error", error);
                    window.location.href = window.location.origin + "/app/#/callouts";
                    return error;
                }
            );
        let memberCalloutData = res.data;
        setFields(memberCalloutData);
    }

    const actionCallout = async (dataInfo, memberStatus) => {
        setAcceptMessageClass("alert-primary");
        setAcceptMessage("Please Wait....");
        window.scrollTo({ behavior: 'smooth', top: '0px' });
        //"Callout_Type": dataInfo.callout_type, "Message_Number": dataInfo.message_number, "Message_Type":"Confirmation" 
        let filterString = { 'event_intensity_id': dataInfo.crm_event_intensity_id, "Message_Type": "Accept-Confirmation" };
        console.log("Json messagefilterString", filterString);
        let messageContentInfo = _lodash.find(crmCalloutMessages, filterString);

        // console.log("dataInfo ",dataInfo);
        //console.log("filterString  ",filterString);
        //console.log("crmCalloutMessages ",crmCalloutMessages);
        console.log("messageContentInfo ", messageContentInfo);

        let sendInfo = {};
        sendInfo.id = id;
        sendInfo.content_info = encodeURIComponent(null);
        if (messageContentInfo !== undefined) {
            sendInfo.content_info = encodeURIComponent(messageContentInfo.Message_Content);
        } else {
            sendInfo.content_info = `Thank you for accepting the position.  We will reach out again with your shift details and final starting time.  Any questions reach out to snow dispatch on voice or text 201-949-7669 any question.  Thank you for being part of our team!`;
        }
        sendInfo.member_email = loginMemberData.email;
        sendInfo.status = memberStatus;
        //console.log("acceptCallout sendInfo ",sendInfo);

        var requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendInfo)
        }

        let responseData = await fetch(CONSTANTS.url.memberAcceptCallout, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log('error in accepting invitation', error)
                return "";
            });
        if (responseData !== "") {
            setAcceptMessageClass("alert-success");
            setAcceptMessage("Thank you for your response,We will get back to you..");
            setTimeout(function () {
                setAcceptMessageClass("")
                setAcceptMessage("");
                history.push(`/callouts/`);
            }, 5000);
        } else {
            setAcceptMessageClass("alert-danger");
            setAcceptMessage("Something went wrong please try again..");
            setTimeout(function () {
                setAcceptMessageClass("");
                setAcceptMessage("");
            }, 5000);
        }

        //console.log("acceptCallout", JSON.stringify(fields));
    }

    const getData = async (name) => {
        // logged in memeber info
        if (props.memberinfo.loading === true) {
            await dispatch(getMemberInfoById({ "member_id": props.currentuser.user_id }));
        }

        if (props.locations.loading === true) {
            await dispatch(allAccountLocation());
        }

        if (props.jobpostion.loading === true) {
            await dispatch(allJobposition());
        }

        if (props.teamzone.loading === true) {
            await dispatch(allTeamzone());
        }

        if (props.calloutmessages.loading === true) {
            await dispatch(getAllCalloutMessage());
        }
        if (getCRMDataLoadingStatus() == true) {
            setLoadingMessage("");
        }
        if (getCRMDataCount() === false) {
            setCrmAppDataloading("Something went wrong please visit page again...");
        }
    }

    const setData = async (name) => {

        if (props.locations.loading === false) {
            setCrmLocation(props.locations.data);
        }

        if (props.jobpostion.loading === false) {
            setCrmJobPosition(props.jobpostion.data);
        }

        if (props.teamzone.loading === false) {
            setCrmTeamzone(props.teamzone.data);
        }

        if (props.calloutmessages.loading === false) {
            setCrmCalloutMessages(props.calloutmessages.data);
        }

        if (props.memberinfo.loading === false) {
            setLoginMemberData(props.memberinfo.data);
        }
    }

    function getCRMDataLoadingStatus() {
        let returnStatus = false;
        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false && props.calloutmessages.loading == false) {
            returnStatus = true;
        }
        return returnStatus;
    }

    function getCRMDataCount() {
        let returnStatus = false;
        if ((_lodash.size(props.locations.data) > 0) && (_lodash.size(props.jobpostion.data) > 0) && (_lodash.size(props.teamzone.data) > 0) && (_lodash.size(props.calloutmessages.data) > 0)) {
            returnStatus = true;
        }
        return returnStatus;
    }

    let loadingText = "Loading information...";
    if (crmAppDataloading !== "" && loadingMessage == "") {
        loadingText = "Something went wrong please visit page again...";
    } else if (crmAppDataloading == "" && loadingMessage == "") {
        loadingText = "";
        dataValue = fields;

        console.log("fields data", fields);
        let crm_location_name = "";
        let locationInfo = _lodash.find(crmLocation, { 'id': fields.crm_location_id });
        if (locationInfo !== undefined) {
            crm_location_name = locationInfo.Account_Name;
        }

        let crm_teamzone_name = "";
        let teamzoneInfo = _lodash.find(crmTeamzone, { 'id': fields.crm_teamzone_id });
        if (teamzoneInfo !== undefined) {
            crm_teamzone_name = teamzoneInfo.Name;
        }

        let crm_role_name = "";
        let jobPositionInfo = _lodash.find(crmjobPosition, { 'id': fields.crm_role_id });
        if (jobPositionInfo !== undefined) {
            crm_role_name = jobPositionInfo.Name;
        }
        dataValue.crm_location_name = crm_location_name;
        dataValue.crm_teamzone_name = crm_teamzone_name;
        dataValue.crm_role_name = crm_role_name;
        dataValue.content_info = "";
        let filterString = { 'event_intensity_id': fields.crm_event_intensity_id, "Callout_Type": fields.callout_type, "Message_Number": String(fields.message_number).trim(), "Message_Type": fields.message_type };

        if (fields.callout_type === "Confirmation") {
            delete filterString.Message_Number;
        }
        console.log("Json messagefilterString", filterString);
        let messageContentInfo = _lodash.find(crmCalloutMessages, filterString);
        console.log("Json messageContentInfo", JSON.stringify(messageContentInfo));
        let contentInfo = "";
        let table = `<table id="memberCalloutDetailsInfo"><tr><td style=""><b>Team Zone</b></td><td style="">${dataValue.crm_teamzone_name}</td></tr><tr><td style=""><b>Location</b></td><td style="">${dataValue.crm_location_name}</td></tr><tr><td style=""><b>Role/Job position</b></td><td style="">${dataValue.crm_role_name}</td></tr>`;

        if (fields.status === "confirm" && fields.confirmation_data !== "") {
            let confirmationData = JSON.parse(fields.confirmation_data);
            console.log("Json confirmation_data", JSON.stringify(confirmationData));

            Object.keys(confirmationData).forEach((key, index) => {
                let value = confirmationData[key];
                key = key.replaceAll("_", " ");
                if (key === "day shift" || key === "night shift") {
                    key = key + "(how many shifts)";
                }
                table = table + `<tr><td style=""><b>${key}</b></td><td style="">${value}</td></tr>`;
            });
        }
        table = table + `</table><br/>`;
        contentInfo = table + contentInfo;
        if (messageContentInfo !== undefined) {
            contentInfo = contentInfo + messageContentInfo.Message_Content;
        } else {
            contentInfo = `Thank you for accepting the position. We will reach out again with your shift details and final starting time.  Any questions reach out to snow dispatch on voice or text 201-949-7669 any question.  Thank you for being part of our team`;
        }

        dataValue.content_info = contentInfo;
    }

    return (
        <React.Fragment>
            <Header />
            <div className="content container">
                <Row>
                    <Col md="12">
                        <Card className="card-user event_info" >
                            <CardHeader>
                                <Row>
                                    <Col className="pr-1" md="12">
                                        <CardTitle tag="h5">{props.name}</CardTitle>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {
                                    (loadingText == "") ?
                                        <React.Fragment>
                                            {(dataValue.status === "") ? window.location.href = window.location.origin + "/app/#/callouts" : ""}
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    {(acceptMessage !== '') ? <React.Fragment>
                                                        <div className={`alert ${acceptMessageClass}`} role="alert">{acceptMessage}</div>
                                                    </React.Fragment> : ""}
                                                   
                                                    {/* {JSON.stringify(dataValue)} */}
                                                    <div className="" dangerouslySetInnerHTML={{ __html: dataValue.content_info }}></div>
                                                    <br />

                                                    {(dataValue.status === "send") ? <React.Fragment>
                                                        <form method="post" name="acceptevent" encType="multipart/form-data" novalidate>
                                                            <button type="button" className="btn btn-success" onClick={() => actionCallout(dataValue, "accepted")}>Accept</button>
                                                        &nbsp;&nbsp;
                                                        <button type="button" className="btn btn-danger" onClick={() => actionCallout(dataValue, "declined")}>Decline</button>
                                                        </form>
                                                    </React.Fragment> : ""}

                                                    {(dataValue.status === "declined") ? <React.Fragment>
                                                        <div className={`alert alert-danger`} role="alert">This callout is declined by you</div>
                                                    </React.Fragment> : ""}

                                                    {(dataValue.status === "accepted") ? <React.Fragment>
                                                        <div className={`alert alert-success`} role="alert">This callout is accepted by you</div>
                                                    </React.Fragment> : ""}

                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                        : <h5>{loadingText}</h5>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />
        </React.Fragment>
    )
}

function CalloutDetails(props) {
    const { ROWID, crm_teamzone_name, crm_location_name, crm_role_name, status, count } = props.data;

    return (
        <tr>
            <td className="pl-4">{count}</td>
            <td>
                <h5 className="font-medium mb-0">{crm_teamzone_name}</h5>
                {/* <span className="text-muted">Texas, Unitedd states</span> */}
            </td>
            <td>
                <span className="text-muted">{crm_location_name}</span><br />

            </td>
            <td>
                <span className="text-muted">{crm_role_name}</span><br />
            </td>
            <td>
                {(status === "send") ? <NavLink style={{ fontSize: "22px" }} exact activeClassName="active" className='' to={`/accept-callout/${ROWID}`}>
                    Open
                </NavLink> : ""
                }
                {(status === "accepted") ? "Accepted" : ""}
                {(status === "declined") ? "Declined" : ""}
                {(status === "confirm") ? <NavLink style={{ fontSize: "22px" }} exact activeClassName="active" className='' to={`/accept-callout/${ROWID}`}> Confirmed</NavLink> : ""}
            </td>
        </tr>
    );
}

function CallOutListing(props) {
    let history = useHistory();
    let dispatch = useDispatch();

    let allFields = { "event_name": "", "start_date": "", "end_date": "" };
    const [error, setError] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [startRecordIndex, setStartRecordIndex] = useState(1);
    const [endRecordIndex, setEndRecordIndex] = useState(CONSTANTS.recordLimit);
    const [dataLimit, setDataLimit] = useState(CONSTANTS.recordLimit);
    const [fields, setFields] = useState(allFields);
    const [searchLoading, setSearchLoading] = useState('');
    const [loadingMessage, setLoadingMessage] = useState("Loading information....");
    const [crmAppDataloading, setCrmAppDataloading] = useState("");

    const [crmLocation, setCrmLocation] = useState([]);
    const [crmjobPosition, setCrmjobPosition] = useState([]);
    const [crmTeamzone, setCrmTeamzone] = useState([]);
    const [crmEventIntensity, setCrmEventIntensity] = useState([]);
    const [crmCalloutMessages, setCrmCalloutMessages] = useState([]);
    const [events, setEvents] = useState([]);
    const [allCalloutData, setAllCalloutData] = useState({ "data": [], "message": "Loading information...." });
    const [loginMemberData, setLoginMemberData] = useState({});

    let totalDataCount = 0;
    let pageLimit = 3;
    let allCallouts = [];
    let showCalloutDeatils = [];
    let allCalloutsCount = 0;
    let totalPages = 0;
    let startRecordNo = 0;
    let endRecordNo = 0;
    let lastPageNo = 0;
    let fisrtPageNo = 0;
    let memberCalloutData = { ...fields, data_limit: dataLimit, page: currentPage };

    // route change
    useEffect(() => {
        console.log('CallOutListing page loads');
        setLoadingMessage("Loading information....");
        getData(null);
        setData(null);
        console.log("useEffect getCRMDataCount", getCRMDataCount());
        if (getCRMDataCount() === false) {
            setCrmAppDataloading("Something went wrong please visit page again...");
        } else {
            setCrmAppDataloading("");
        }
    }, []);

    //page reload
    useEffect(() => {
        setLoadingMessage("Loading information....");
        setData(null);
        if (getCRMDataLoadingStatus() === true) {
            setLoadingMessage("");
        }
        //console.log("page reload useEffect getCRMDataCount", getCRMDataCount());
        if (getCRMDataCount() === false) {
            setCrmAppDataloading("Something went wrong please visit page again...");
        } else {
            setCrmAppDataloading("");
        }
    }, [props.memberinfo.loading, props.locations.loading, props.jobpostion.loading, props.teamzone.loading, props.allevents.loading, props.allintensity.loading, props.calloutmessages.loading]);

    //on pagination change
    useEffect(() => {
        if (loginMemberData.hasOwnProperty('ROWID') === true) {
            //console.log("startRecordIndex  ", startRecordIndex);
            //console.log("endRecordIndex ", endRecordIndex);
            memberCalloutData = { ...memberCalloutData, member_id: loginMemberData.ROWID }
            fetchCallouts(memberCalloutData);
        }
    }, [loginMemberData, currentPage, startRecordIndex, endRecordIndex]);


    const fetchCallouts = async (memberCalloutData) => {
        console.log('inside fetchCallouts');

        let requestOptions = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        };
        let queryParams = objToSerialize(memberCalloutData);
        let apiresponse = await fetch(CONSTANTS.url.getTeamMemberCalloutList + "?" + queryParams, requestOptions).then(response => response.json())
            .then(result => {
                console.log("fetchCallouts success", result);
                return result;
            }).catch(error => {
                console.log("fetchCallouts error", error);
                return "";
            });
        if (apiresponse !== "") {
            setAllCalloutData(apiresponse);
        } else {
            setAllCalloutData({});
            setLoadingMessage("Something went wrong please visit page again...");
        }
        window.scrollTo({ behavior: 'smooth', top: '0px' });

    }

    const getData = async (name) => {
        // logged in memeber info
        if (props.memberinfo.loading === true) {
            await dispatch(getMemberInfoById({ "member_id": props.currentuser.user_id }));
        }

        if (props.locations.loading === true) {
            await dispatch(allAccountLocation());
        }

        if (props.jobpostion.loading === true) {
            await dispatch(allJobposition());
        }

        if (props.teamzone.loading === true) {
            await dispatch(allTeamzone());
        }

        if (props.allevents.loading === true) {
            props.allEvents({});
        }

        if (props.allintensity.loading === true) {
            await dispatch(allEventIntensity());
        }

        if (props.calloutmessages.loading === true) {
            await dispatch(getAllCalloutMessage());
        }
        if (getCRMDataLoadingStatus() == true) {
            setLoadingMessage("");
        }
        if (getCRMDataCount() === false) {
            setCrmAppDataloading("Something went wrong please visit page again...");
        }
    }

    const setData = async (name) => {

        if (props.memberinfo.loading === false) {
            setLoginMemberData(props.memberinfo.data);
        }

        if (props.locations.loading === false) {
            setCrmLocation(props.locations.data);
        }

        if (props.jobpostion.loading === false) {
            setCrmjobPosition(props.jobpostion.data);
        }

        if (props.teamzone.loading === false) {
            setCrmTeamzone(props.teamzone.data);
        }

        if (props.allevents.loading === false) {
            setEvents(props.allevents.data);
        }

        if (props.allintensity.loading === false) {
            setCrmEventIntensity(props.allintensity.data);
        }

        if (props.calloutmessages.loading === false) {
            setCrmCalloutMessages(props.calloutmessages.data);
        }


    }

    function getCRMDataLoadingStatus() {
        let returnStatus = false;
        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false && props.allevents.loading == false && props.allintensity.loading == false && props.calloutmessages.loading == false) {
            returnStatus = true;
        }
        return returnStatus;
    }

    function getCRMDataCount() {
        let returnStatus = false;
        if ((_lodash.size(props.locations.data) > 0) && (_lodash.size(props.jobpostion.data) > 0) && (_lodash.size(props.teamzone.data) > 0) && (_lodash.size(props.allevents.data) > 0) && (_lodash.size(props.allintensity.data) > 0) && (_lodash.size(props.calloutmessages.data) > 0)) {
            returnStatus = true;
        }
        return returnStatus;
    }

    let loadingText = "Loading information...";
    if (_lodash.size(allCalloutData.data) > 0) {
        allCallouts = allCalloutData.data;
        allCalloutsCount = _lodash.size(allCalloutData.data);
        totalDataCount = allCalloutData.total_items;
        totalPages = allCalloutData.total_pages;

        if (crmAppDataloading !== "" && loadingMessage == "") {
            loadingText = "Something went wrong please visit page again...";
        } else {
            loadingText = loadingMessage;
        }
        endRecordNo = endRecordIndex;
        startRecordNo = startRecordIndex;
        if (endRecordIndex >= totalDataCount) {
            endRecordNo = totalDataCount;
        }

        allCallouts.map((d, idx) => {
            let crm_location_name = "";
            let locationInfo = _lodash.find(crmLocation, { 'id': d.crm_location_id });
            if (locationInfo !== undefined) {
                crm_location_name = locationInfo.Account_Name;
            }

            let crm_teamzone_name = "";
            let teamzoneInfo = _lodash.find(crmTeamzone, { 'id': d.crm_teamzone_id });
            if (teamzoneInfo !== undefined) {
                crm_teamzone_name = teamzoneInfo.Name;
            }

            let crm_role_name = "";
            let jobPositionInfo = _lodash.find(crmjobPosition, { 'id': d.crm_role_id });
            if (jobPositionInfo !== undefined) {
                crm_role_name = jobPositionInfo.Name;
            }
            allCallouts[idx]["crm_location_name"] = crm_location_name;
            allCallouts[idx]["crm_teamzone_name"] = crm_teamzone_name;
            allCallouts[idx]["crm_role_name"] = crm_role_name;
            showCalloutDeatils.push(allCallouts[idx]);
        })


    } else if (_lodash.size(allCalloutData.data) == 0) {
        if (loadingMessage == "") {
            loadingText = allCalloutData.message;
        }
    }

    const [pages] = useState(Math.round(totalDataCount / dataLimit));
    function goToNextPage() {
        setCurrentPage((page) => {
            let endInx = (page + 1) * dataLimit;
            let startInx = endInx - (dataLimit - 1)
            setStartRecordIndex(startInx);
            setEndRecordIndex(endInx);
            return page + 1;
        });
    }

    function goToPreviousPage() {
        setCurrentPage((page) => {
            let endInx = (page - 1) * dataLimit;
            let startInx = endInx - (dataLimit - 1)
            setStartRecordIndex(startInx);
            setEndRecordIndex(endInx);
            return page - 1;
        });
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        let endInx = (pageNumber) * dataLimit;
        let startInx = endInx - (dataLimit - 1);
        console.log("startInx " + startInx + "- endInx " + endInx);
        setStartRecordIndex(startInx);
        setEndRecordIndex(endInx);
    }

    const getPaginationGroup = (pageLimit, totalPages) => {
        let startIndex = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        let endIndex = startIndex + pageLimit;
        if (endIndex > totalPages) {
            pageLimit = totalPages - startIndex;
            //console.log("New page limit ",(totalPages-startIndex));
        }
        return new Array(pageLimit).fill().map((_, idx) => startIndex + idx + 1);
    };

    let allpages = getPaginationGroup(pageLimit, totalPages);
    if (Object.keys(allpages).length !== 0) {
        lastPageNo = allpages[allpages.length - 1];
        fisrtPageNo = allpages[0];
    }

    return (
        <React.Fragment>
            <Header />
            <div className="content card-padding-0">
                <Card className="card-user">
                    <CardHeader>
                        <div className="container">
                            <Row>
                                <Col className="pr-1" md="12">
                                    <CardTitle tag="h5">All Callouts</CardTitle>
                                </Col>
                            </Row>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="container">
                            {/*`loadingMessage ${loadingMessage} crmAppDataloading ${crmAppDataloading}`*/}
                            {
                                (loadingText === '') ?
                                    <React.Fragment>
                                        {/* {JSON.stringify(allCallouts)} */}

                                        <Row>
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    <table className="table no-wrap user-table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                                                                <th scope="col" className="border-0 text-uppercase font-medium">Teamzone</th>
                                                                <th scope="col" className="border-0 text-uppercase font-medium">Location</th>
                                                                <th scope="col" className="border-0 text-uppercase font-medium">Role</th>
                                                                <th scope="col" className="border-0 text-uppercase font-medium">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                (allCalloutsCount > 0) ? showCalloutDeatils.map((d, idx) => {
                                                                    return (
                                                                        <React.Fragment >
                                                                            <CalloutDetails key={idx} data={d} />
                                                                        </React.Fragment >
                                                                    );
                                                                }) : <tr><td colSpan="5"></td></tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="pagination justify-content-center mb-0">
                                                    <nav aria-label="Page navigation">
                                                        <ul className="pagination">
                                                            {/* previous button */}

                                                            <li className="page-item">
                                                                <a onClick={goToPreviousPage} className={`prev page-link ${(allpages.lenght == 0 || allpages.lenght == 1 || currentPage === 1) ? 'hide' : ''} ${currentPage === 1 ? 'disabled' : ''}`} >Previous</a>
                                                            </li>

                                                            {/* show page numbers */}

                                                            {getPaginationGroup(pageLimit, totalPages).map((item, index) => (
                                                                <li className="page-item">
                                                                    <a key={index} onClick={changePage} className={`paginationItem page-link ${currentPage === item ? 'active' : null}`} >
                                                                        <span>{item}</span>
                                                                    </a>
                                                                </li>
                                                            ))
                                                            }

                                                            {/* next button */}
                                                            <li className="page-item">
                                                                <a onClick={goToNextPage} className={`next page-link  ${lastPageNo == totalPages ? 'hide' : ''} ${currentPage === pages ? 'disabled' : ''}`}>
                                                                    Next
                                                    </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                    : <h5>{loadingText}</h5>
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
            <Footer />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    //console.log("All State Data " + JSON.stringify(state));
    return {
        currentuser: state.currentuser,
        memberinfo: state.memberinfo,
        locations: state.locations,
        jobpostion: state.jobpostion,
        teamzone: state.teamzone,
        allevents: state.allevents,
        allintensity: state.allintensity,
        calloutmessages: state.calloutmessages
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        fetchProfile: (params) => { dispatch(currentUser(params)) },
        memberInfoById: (params) => { dispatch(getMemberInfoById(params)) },
        allEvents: (params) => { dispatch(getEvents(params)) },
        allAccountLocation: () => { dispatch(allAccountLocation()) },
        allJobposition: () => { dispatch(allJobposition()) },
        allTeamzone: () => { dispatch(allTeamzone()) },
        allEventIntensity: () => { dispatch(allEventIntensity()) },
        allCalloutMessages: () => { dispatch(getAllCalloutMessage()) }

    }
}

// let AddEventsEx = connect(mapStateToProps, mapDispatchToprops)(AddEvents);
// let EventsListingEx = connect(mapStateToProps, mapDispatchToprops)(EventsListing);
let ViewCallOutListingEx = connect(mapStateToProps, mapDispatchToprops)(CallOutListing);
let ViewCallOutInfoEx = connect(mapStateToProps, mapDispatchToprops)(ViewCallOutInfo);
export { ViewCallOutInfoEx, ViewCallOutListingEx };