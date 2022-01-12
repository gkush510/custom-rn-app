import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactTags from 'react-tag-autocomplete';
import { connect, useDispatch } from "react-redux";
import _lodash from "lodash";
import { getMembers, allAccountLocation, allJobposition, allTeamzone, allRoutes, routeLocation, routeRoles } from "../../actions/index.js";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import CONSTANTS from "../../utils/constants.js";

import Select from 'react-select';

import { ErrorMessage, UsersPagination, searchArrayRowValue } from "../Common.js";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col } from "reactstrap";


function AddUsers(props) {

    let allFields = { "first_name": "", "last_name": "", "email": "", "tags": [], "username": "", "phone_number": "", "mobile_number": "", "address_line_1": "", "address_line_2": "", "country": "", "state": "", "city": "", "zipcode": "", "teamzone": [], "availability": "", "location": "", "notes": "", "profile_pic": "", "location_type": "by_location", "route": "" };
    const [fields, setFields] = useState(allFields);
    const [rolesInputList, setRolesInputList] = useState([{ crm_role_id: "", rating: "" }]);
    const [errors, setErrors] = useState({});
    const [rMessage, setRmessage] = useState(null);
    const [rStatus, setRstatus] = useState(true);
    const [tagsSuggestions, setTagsSuggestions] = useState([]);
    const [memberDocument, setMemberDocument] = useState([]);
    const [removeRolesList, setRemoveRolesList] = useState([]);
    let paginationParams = { data_limit: CONSTANTS.recordLimit, page: 1 };

    let history = useHistory();
    let profilePic = React.createRef();
    let memberTags = React.createRef();
    let documentFiles = React.createRef();

    let successMessage = { color: "green" };
    let dataLoadingMessage = "Loading Data....";
    let loadingLocation = props.locations.loading;
    let loadingjobPosition = props.jobpostion.loading;
    let loadingteamzone = props.teamzone.loading;

    let loadingAllroutes = props.allroutes.loading;
    let loadingRouteslocation = props.routeslocation.loading;
    let loadingRoutesrole = props.routesrole.loading;

    let allLocation = {};
    let alljobPosition = {};
    let allTeamzone = {};

    let allRoutes = [];
    let allRouteslocation = {};
    let allRoutesrole = {};


    useEffect(() => {
        if (props.locations.loading === true) {
            props.allAccountLocation();
        }
        if (props.jobpostion.loading === true) {
            props.allJobposition();
        }

        if (props.teamzone.loading === true) {
            props.allTeamzone();
        }

        if (props.allroutes.loading === true) {
            props.allRoutesInfo();
        }
        if (props.routeslocation.loading === true) {
            props.allRouteLocation();
        }

        if (props.routesrole.loading === true) {
            props.allrouteRoles();
        }

        console.log('add page loads');
    }, []);

    if (loadingLocation === false) {
        allLocation = props.locations.data;
        console.log("allLocation data info inside false ", allLocation.length)
    }

    if (loadingjobPosition === false) {
        alljobPosition = props.jobpostion.data;
        console.log("alljobPosition data info inside false ", alljobPosition.length)
    }

    if (loadingteamzone === false) {
        allTeamzone = props.teamzone.data;
        console.log("allTimezone data info inside false ", allTeamzone.length)
    }


    if (loadingAllroutes === false) {
        let allRoutesData = props.allroutes.data;
        if (_lodash.size(allRoutesData) > 0) {
            allRoutesData.map((d, idx) => {
                allRoutes.push({ "value": d.id, "label": d.Name });
            });
        }


        console.log("allRoutes data info inside false ", allRoutes.length)
    }

    if (loadingRouteslocation === false) {
        allRouteslocation = props.routeslocation.data;
        console.log("allRouteslocation data info inside false ", allRouteslocation.length)
    }

    if (loadingRoutesrole === false) {
        allRoutesrole = props.routesrole.data;
        console.log("allRoutesrole data info inside false ", allRoutesrole.length)
    }

    if (loadingLocation == false && loadingjobPosition == false && loadingteamzone == false && loadingAllroutes == false && loadingRouteslocation == false && loadingRoutesrole == false) {
        dataLoadingMessage = "";
    }

    // onchange input
    const fieldInput = (event) => {
        let { name, value } = event.target;
        //console.log("Name:"+name+" Value:"+value);
        setFields((previousValue) => {
            return {
                ...previousValue,
                [name]: value
            }
        });
    }

    const selectCountry = (val) => {
        setFields({ ...fields, ["country"]: val });
    }

    const selectState = (val) => {
        setFields({ ...fields, ["state"]: val });
    }

    const teamZoneOnChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setFields({ ...fields, ["teamzone"]: value });
    }

    const onSelectProfilePic = (event) => {
        let photoExtType = ['png', 'jpg', 'jpeg'];
        let selectedFileUrl = URL.createObjectURL(profilePic.current.files[0]);
        console.log("profilePic current", profilePic.current.files[0]);
        console.log("selectedFileUrl", selectedFileUrl);
        //setMemberPhoto(selectedFileUrl);
        let photofileName = profilePic.current.files[0].name;
        let photofileExt = photofileName.substring(photofileName.lastIndexOf('.') + 1).toLowerCase();
        if (photoExtType.indexOf(photofileExt) <= -1) {
            setFields({ ...fields, ['profile_pic']: CONSTANTS.url.defaultUserImage });
            return;
        }
        setFields({ ...fields, ['profile_pic']: selectedFileUrl });
    }

    const onSelectdocumentFiles = (event) => {
        let documentFilesNames = [];
        const files = documentFiles.current.files;
        for (let i = 0; i < files.length; i++) {
            documentFilesNames.push(files[i].name);
        }
        setMemberDocument(documentFilesNames);
    }

    const onDelete = (i) => {
        //console.log("onDelete tages",JSON.stringify(i));
        const tags = fields.tags.slice(0)
        tags.splice(i, 1);
        setFields({ ...fields, ['tags']: tags });
        //this.setState({ tags })
        console.log("onDelete tags", JSON.stringify(fields));
    }

    const onAddition = (tag) => {
        // console.log("Adding tages",JSON.stringify(tag));
        const tags = [].concat(fields.tags, tag);
        // //this.setState({ tags })
        setFields({ ...fields, ['tags']: tags });
        console.log("onAddition tags", JSON.stringify(fields));
    }

    const handleRolesInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rolesInputList];
        list[index][name] = value;
        setRolesInputList(list);

        let matchedData = _lodash.map(list, 'crm_role_id');
        setRemoveRolesList(matchedData);


    };

    // handle click event of the Remove button
    const handleRolesRemoveClick = (e, index) => {
        const list = [...rolesInputList];
        list.splice(index, 1);
        setRolesInputList(list);
        let matchedData = _lodash.map(list, 'crm_role_id');
        setRemoveRolesList(matchedData);
    };

    // handle click event of the Add button
    const handleRolesAddClick = (e, index) => {
        setRolesInputList([...rolesInputList, { crm_role_id: "", rating: "" }]);
    };

    const onChangeLocationType = (selectedOption) => {
        console.log(`Location type selected:`, selectedOption);
        setFields({ ...fields, ["location_type"]: selectedOption });
    }

    const onChangeRoute = (selectedOption) => {
        console.log(`Route type selected:`, selectedOption);
        let value = selectedOption.value;
        console.log(`Route type selected value:`, value);
        setFields({ ...fields, ["route"]: selectedOption });
    }


    //Onsubmit input
    const onRegisterSubmit = (e) => {
        e.preventDefault();
        //console.log("Register Submitted Data", JSON.stringify(fields));
        registerusers(fields);

    };

    const registerusers = (dataParms) => {

        setRmessage("Adding...");
        window.scrollTo({ behavior: 'smooth', top: '0px' });

        let docExtType = ['pdf', 'doc', 'docx', 'txt', 'xlsx', 'odt', 'png', 'jpg', 'jpeg'];
        let photoExtType = ['png', 'jpg', 'jpeg'];
        let raw = JSON.stringify(dataParms);
        const formData = new FormData();
        let fileuploadingErrors = {};
        let docFileCount = 0;
        let docFileExt = true;
        let docFileSizeStatus = true;
        let fileSizeLimit = 1048576;//1MB


        if (profilePic.current.files.length !== 0) {
            dataParms.photo = profilePic.current.files[0];
            let photofileName = profilePic.current.files[0].name;
            let photofileSize = profilePic.current.files[0].size;
            let photofileExt = photofileName.substring(photofileName.lastIndexOf('.') + 1).toLowerCase();
            if (photoExtType.indexOf(photofileExt) <= -1) {
                fileuploadingErrors.photo = "Please Upload only png,jpg,jpeg extension photo";
            }
            if (photofileSize > fileSizeLimit) {
                fileuploadingErrors.photo = "Please Upload profile photo less than 1MB";
            }
        }

        for (let i = 0; i < documentFiles.current.files.length; i++) {
            let docfileName = documentFiles.current.files[i].name;
            let docfileSize = documentFiles.current.files[i].size;
            formData.append("document", documentFiles.current.files[i]);
            docFileCount = docFileCount + 1;
            let docfileExt = docfileName.substring(docfileName.lastIndexOf('.') + 1).toLowerCase();
            if (docExtType.indexOf(docfileExt) <= -1) {
                docFileExt = false;
            }
            if (docfileSize > fileSizeLimit) {
                docFileSizeStatus = false;
            }
        }

        if (docFileCount > 8) {
            fileuploadingErrors.document = "Please upload maximum 8 document only";
            console.log("Document is more than 8");
        }
        console.log("docFileCount is", docFileCount);


        if (docFileSizeStatus === false) {
            fileuploadingErrors.document = "Please Upload document file less than 1MB.";
        }

        if (docFileExt === false) {
            fileuploadingErrors.document = "Please Upload only pdf,doc,zip,txt,xlsx and ppt extension document";
            //setRmessage("Some error occured uploading documents");
        }
        if (Object.keys(fileuploadingErrors).length) {
            setErrors(fileuploadingErrors);
            setRstatus(false);
            setRmessage("Some error occured.Please check");
            return;
        }

        dataParms.member_roles = rolesInputList;
        for (const [key, value] of Object.entries(dataParms)) {
            //console.log(`key ${key}: value ${value}`);
            if (key === 'tags' || key === 'teamzone' || key === "member_roles" ) {
                formData.append(key, JSON.stringify(value));
            } else if(key === 'route' && value !="" ){
                formData.append(key, JSON.stringify(value));
            }else {
                formData.append(key, value);
            }
        }

        //headers: { "Content-Type": "application/json" }
        let requestOptions = {
            method: 'POST',
            body: formData
        };
        console.log("formData submitted", JSON.stringify(formData));

        let data = {};
        fetch(CONSTANTS.url.addMemberUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                //console.warn("Register API Results warn", JSON.parse(result));
                let resultData = JSON.parse(result);
                //console.log("Register API Results ", resultData.status);
                if (resultData.status === 200) {
                    setFields(allFields);
                    setRolesInputList([{ crm_role_id: "", rating: "" }]);
                    setMemberDocument([]);
                    setErrors({});
                    setRmessage(resultData.message);
                    setRstatus(true);
                    //console.warn(history.push('home'))
                    props.allTeamMembers(paginationParams);
                    setTimeout(function () {
                        setRmessage('');
                        //window.location.reload();
                        history.push(`/admin/member/add`);
                    }, 5000);
                }
                if (resultData.status !== 200) {
                    //console.warn("error by api ", JSON.parse(resultData.status));
                    setErrors(resultData.errors);
                    setRmessage(resultData.message);
                    setRstatus(false);
                }
            }).catch(error => {
                //console.log('"Register API Results error', JSON.stringify(error));
                data.errors = error;
                data.data = JSON.parse(raw);
            });
    }
    //console.log("Errors validation", JSON.stringify(errors));
    //console.log("Registration Message", rMessage);
    //console.log("Errors object length ", Object.keys(errors).length);


    if (rStatus === false) {
        successMessage = { color: "#dc3545", textAlign: "center", margin: "0" };
    } else {
        successMessage = { color: "green", textAlign: "center", margin: "0" };
    }


    return (
        <React.Fragment>
            <div className="content card-padding-0">
                <form onSubmit={onRegisterSubmit} method="post" name="registration" encType="multipart/form-data">
                    <Row>
                        <Col md="4">
                            <Card className="card-user">
                                <CardBody>
                                    <div className="container">
                                        <Row>
                                            <Col md="12">
                                                <div className="image">
                                                    <img style={{ display: "none" }}
                                                        alt="..."
                                                        src={(fields.profile_pic !== "") ? fields.profile_pic : CONSTANTS.url.defaultUserImage}
                                                    />
                                                </div>

                                                <div className="author">
                                                    <img alt="..." className="avatar border-gray" src={(fields.profile_pic !== "") ? fields.profile_pic : CONSTANTS.url.defaultUserImage} />

                                                    <input type="file" accept=".png, .jpg, .jpeg" ref={profilePic} onChange={onSelectProfilePic} className="form-control" />
                                                    <ErrorMessage errors={errors} fieldName="photo" />
                                                    {/* {(memberPhoto) ? <Button className="btn-round" color="primary" type="submit"> Update Photo</Button> : ""} */}
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card className="card-user">
                                <CardHeader>
                                    <div className="container">
                                        <Row>
                                            <Col className="" md="12">
                                                <CardTitle tag="h5">Add Member</CardTitle>
                                                {dataLoadingMessage}
                                                {
                                                    ((rMessage != null)) ? <h4 style={successMessage} id="successM" >{rMessage}</h4> : ""
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="container">
                                        <Row>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="username">UserName</label>
                                                    <input type="text" name="username" className="form-control" id="username" placeholder="Enter Username" onChange={fieldInput} value={fields.username} />
                                                    <ErrorMessage errors={errors} fieldName="username" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="first_name">First Name</label>
                                                    <input type="text" name="first_name" className="form-control" id="first_name" placeholder="Enter Firstname" onChange={fieldInput} value={fields.first_name} />
                                                    <ErrorMessage errors={errors} fieldName="first_name" />
                                                </FormGroup>
                                            </Col>

                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="last_name">Last Name</label>
                                                    <input type="text" name="last_name" className="form-control" id="last_name" placeholder="Enter Lastname" onChange={fieldInput} value={fields.last_name} />
                                                    <ErrorMessage errors={errors} fieldName="last_name" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="email">Email address</label>
                                                    <input type="email" name="email" className="form-control" id="email" placeholder="Enter Email" onChange={fieldInput} value={fields.email} />
                                                    <ErrorMessage errors={errors} fieldName="email" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="phone_number">Phone Number</label>
                                                    <input type="text" name="phone_number" className="form-control" id="phone_number" placeholder="Enter Phone Number" onChange={fieldInput} value={fields.phone_number} />
                                                    <ErrorMessage errors={errors} fieldName="phone_number" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="mobile_number">Mobile Number</label>
                                                    <input type="text" name="mobile_number" className="form-control" id="mobile_number" placeholder="Enter Mobile Number" onChange={fieldInput} value={fields.mobile_number} />
                                                    <ErrorMessage errors={errors} fieldName="mobile_number" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="" md="6">
                                                <FormGroup>
                                                    <label htmlFor="address_line_1">Address Line 1</label>
                                                    <input type="text" name="address_line_1" className="form-control" id="address_line_1" placeholder="Enter Address Line 1" onChange={fieldInput} value={fields.address_line_1} />
                                                    <ErrorMessage errors={errors} fieldName="address_line_1" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="6">
                                                <FormGroup>
                                                    <label htmlFor="address_line_2">Address Line 2</label>
                                                    <input type="text" name="address_line_2" className="form-control" id="address_line_2" placeholder="Enter Address Line 2" onChange={fieldInput} value={fields.address_line_2} />
                                                    <ErrorMessage errors={errors} fieldName="address_line_2" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="country">Country</label>
                                                    <CountryDropdown value={fields.country} onChange={(val) => selectCountry(val)} name="country" className="form-control" />
                                                    <ErrorMessage errors={errors} fieldName="country" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="state">State</label>
                                                    <RegionDropdown value={fields.state} country={fields.country} onChange={(val) => selectState(val)} className="form-control" />
                                                    <ErrorMessage errors={errors} fieldName="state" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" name="city" className="form-control" id="city" placeholder="Enter City" onChange={fieldInput} value={fields.city} />
                                                    <ErrorMessage errors={errors} fieldName="city" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="zipcode">Zip Code</label>
                                                    <input type="text" name="zipcode" className="form-control" id="zipcode" placeholder="Enter Zip Code" onChange={fieldInput} value={fields.zipcode} />
                                                    <ErrorMessage errors={errors} fieldName="zipcode" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="availability">Availability</label>

                                                    <select name="availability" className="form-control" id="availability" onChange={fieldInput} value={fields.availability || ""}>
                                                        <option value="">Select availability</option>
                                                        <option value="always">Always Available</option>
                                                        <option value="mostly">Mostly Available</option>
                                                        <option value="sometimes">Sometimes Available</option>
                                                        <option value="rarely">Rarely Available</option>
                                                    </select>
                                                    <ErrorMessage errors={errors} fieldName="availability" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="4">
                                                <FormGroup>
                                                    <label htmlFor="location_type">Location Type</label>
                                                    <select name="location_type" className="form-control" id="location_type" onChange={fieldInput} value={fields.location_type || "by_location"}>
                                                        
                                                        <option value="by_location">Location</option>
                                                        <option value="by_route">Route</option>
                                                    </select>
                                                    <ErrorMessage errors={errors} fieldName="location_type" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="" md="6">
                                                {(fields.location_type === "by_location") ?
                                                    <FormGroup>
                                                        <label htmlFor="location">Location</label>
                                                        <select name="location" className="form-control" id="location" onChange={fieldInput} value={fields.location || ""}>
                                                            <option value="">Select Location</option>
                                                            {(dataLoadingMessage === "") ?
                                                                allLocation.map((d, idx) => (
                                                                    <React.Fragment>
                                                                        <option value={d.id}>{d.Account_Name}</option>
                                                                    </React.Fragment>
                                                                ))
                                                                : ""}

                                                        </select>
                                                        <ErrorMessage errors={errors} fieldName="location" />
                                                    </FormGroup>
                                                    : ""}
                                                {(fields.location_type === "by_route") ?
                                                    <FormGroup >
                                                        <label htmlFor="location">Route</label>
                                                        <Select isMulti={false} name="route" placeholder="Search Route" value={fields.route} onChange={e => { onChangeRoute(e) }} options={allRoutes} />
                                                        <ErrorMessage errors={errors} fieldName="route" />
                                                    </FormGroup>
                                                    : ""}
                                            </Col>
                                            <Col className="" md="6">
                                                <FormGroup>
                                                    <label htmlFor="tags">Tags</label>
                                                    <ReactTags
                                                        ref={memberTags}
                                                        tags={fields.tags}
                                                        suggestions={tagsSuggestions}
                                                        onDelete={onDelete}
                                                        onAddition={onAddition}
                                                        allowNew={true}
                                                        autoresize={false}
                                                        className={"form-control"}
                                                    />

                                                    <ErrorMessage errors={errors} fieldName="tags" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="" md="6">
                                                <FormGroup>
                                                    <label htmlFor="teamzone">Team/Zone</label>
                                                    <select name="teamzone" multiple={true} className="form-control" id="teamzone" onChange={teamZoneOnChange} value={fields.teamzone || []}>
                                                        {(dataLoadingMessage === "") ?
                                                            allTeamzone.map((d, idx) => (
                                                                <React.Fragment>
                                                                    <option value={d.id}>{d.Name}</option>
                                                                </React.Fragment>
                                                            ))
                                                            : ""}
                                                    </select>
                                                    <ErrorMessage errors={errors} fieldName="teamzone" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="" md="6">
                                                <FormGroup>
                                                    <label htmlFor="notes">Notes</label>
                                                    <textarea name="notes" onChange={fieldInput} value={fields.notes} className="form-control" id="notes" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className=" roles_box_wrap members" md="12">
                                                <p><b>Job Position</b></p>
                                                {rolesInputList.map((x, i) => {
                                                    //console.log("rolesInputList loop",JSON.stringify(x));
                                                    return (
                                                        <React.Fragment>
                                                            <div className="roles_box">
                                                                <div className="alignLeft fieldsData">
                                                                    <label>Role (Job Position)</label>
                                                                    <select name="crm_role_id" className="form-control" id="crm_role_id" onChange={e => handleRolesInputChange(e, i)} value={x.crm_role_id || ""}>
                                                                        <option value="">Select Job Position</option>
                                                                        {(dataLoadingMessage === "") ?
                                                                            alljobPosition.map((d, idx) => (
                                                                                <React.Fragment>
                                                                                    <option className={(removeRolesList.includes(d.id)) ? "opthide" : ""} value={d.id}>{d.Name}</option>
                                                                                </React.Fragment>
                                                                            ))
                                                                            : ""}
                                                                    </select>
                                                                </div>
                                                                <div className="alignLeft fieldsData">
                                                                    <label>Rating</label>
                                                                    <select name="rating" className="form-control" id="rating" onChange={e => handleRolesInputChange(e, i)} value={x.rating || ""}>
                                                                        <option value="">Select Rating</option>
                                                                        <option value="Beginner">Beginner</option>
                                                                        <option value="Intermediate">Intermediate</option>
                                                                        <option value="Expert">Expert</option>
                                                                    </select>
                                                                </div>

                                                                <div className="alignLeft btn-box">
                                                                    {rolesInputList.length !== 1 && <button type="button" className="btn-round btn btn-primary" onClick={e => handleRolesRemoveClick(e, i)}>Remove</button>}
                                                                </div>
                                                                <div className="addButtonWrap">
                                                                    {rolesInputList.length - 1 === i && <button type="button" className="btn-round btn btn-primary" onClick={e => handleRolesAddClick(e, i)}>Add</button>}
                                                                </div>
                                                            </div>

                                                        </React.Fragment>
                                                    )
                                                })
                                                }
                                                <ErrorMessage errors={errors} fieldName="member_roles" />
                                                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(rolesInputList)}</div> */}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="roles_box_wrap members" md="12">
                                                <p><b>Upload Documents</b></p>
                                                <ol>
                                                    {(memberDocument.length !== 0) ?
                                                        memberDocument.map((d, idx) => (
                                                            <React.Fragment>
                                                                <li>{d}</li>
                                                            </React.Fragment>
                                                        ))
                                                        : ""}
                                                </ol>
                                                <label>Upload Multiple File by Ctrl+Select file (Max 8 files)</label><br />
                                                <input type="file" accept=".png, .jpg, .jpeg,.doc, .docx, .xml, .pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" ref={documentFiles} onChange={onSelectdocumentFiles} multiple className="form-control" />
                                                <ErrorMessage errors={errors} fieldName="document" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="update ml-auto mr-auto">
                                                <Button className="btn-round" color="primary" type="submit"
                                                > Add Member
                                            </Button>
                                            </div>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </div>
        </React.Fragment>
    )
}

function EditMember(props) {
    let history = useHistory();
    const { id } = useParams();
    let allMembers = [];
    allMembers = props.allmembers.data;
    let allMembersCount = props.allmembers.data.length;
    console.log("allMembers outside", allMembers);

    let allFields = { "first_name": "", "last_name": "", "email": "", "tags": [], "username": "", "phone_number": "", "mobile_number": "", "address_line_1": "", "address_line_2": "", "country": "", "state": "", "city": "", "zipcode": "", "teamzone": [], "availability": "", "location": "", "notes": "", "location_type": "by_location", "route": "" };
    const [fields, setFields] = useState(allFields);
    const [rolesInputList, setRolesInputList] = useState([{ crm_role_id: "", rating: "" }]);
    const [errors, setErrors] = useState({});
    const [rMessage, setRmessage] = useState(null);
    const [rStatus, setRstatus] = useState(true);
    const [tagsSuggestions, setTagsSuggestions] = useState([]);
    const [memberDocument, setMemberDocument] = useState([]);
    const [uploadedMemberDocument, setUploadedMemberDocument] = useState([]);
    const [memberRoleId, setMemberRoleId] = useState([]);
    const [memberTimeZoneIds, setMemberTimeZoneIds] = useState([]);
    const [profile_pic, setProfilePic] = useState("");
    const [photoMessage, setPhotoMessage] = useState("Loading Photo....");
    const [loadingMessage, setLoadingMessage] = useState("Loading Information....");
    const [removeRolesList, setRemoveRolesList] = useState([]);
    const [userDetailsFlag, setUserDetailsFlag] = useState(false);
    let paginationParams = { data_limit: CONSTANTS.recordLimit, page: 1 };

    let profilePic = React.createRef();
    let memberTags = React.createRef();
    let documentFiles = React.createRef();

    let successMessage = { color: "green" };
    let dataLoadingMessage = "Loading Data....";
    let loadingLocation = props.locations.loading;
    let loadingjobPosition = props.jobpostion.loading;
    let loadingteamzone = props.teamzone.loading;

    let loadingAllroutes = props.allroutes.loading;
    let loadingRouteslocation = props.routeslocation.loading;
    let loadingRoutesrole = props.routesrole.loading;


    let allLocation = {};
    let alljobPosition = {};
    let allTeamzone = {};
    let memberDetails = [];

    let allRoutes = [];
    let allRouteslocation = {};
    let allRoutesrole = {};

    useEffect(() => {
        if (props.locations.loading === true) {
            props.allAccountLocation();
        }
        if (props.jobpostion.loading === true) {
            props.allJobposition();
        }

        if (props.teamzone.loading === true) {
            props.allTeamzone();
        }

        if (props.allroutes.loading === true) {
            props.allRoutesInfo();
        }
        if (props.routeslocation.loading === true) {
            props.allRouteLocation();
        }

        if (props.routesrole.loading === true) {
            props.allrouteRoles();
        }


        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false && props.allroutes.loading == false && props.routeslocation.loading == false && props.routesrole.loading == false) {
            setUserDetailsFlag(true);
        }
        console.log('EditMember page loads');
    }, []);

    useEffect(() => {
        if (props.locations.loading === true) {
            props.allAccountLocation();
        }

        if (props.jobpostion.loading === true) {
            props.allJobposition();
        }

        if (props.teamzone.loading === true) {
            props.allTeamzone();
        }

        if (props.allroutes.loading === true) {
            props.allRoutesInfo();
        }
        if (props.routeslocation.loading === true) {
            props.allRouteLocation();
        }

        if (props.routesrole.loading === true) {
            props.allrouteRoles();
        }


        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false && props.allroutes.loading == false && props.routeslocation.loading == false && props.routesrole.loading == false) {
            setUserDetailsFlag(true);
        }

        console.log('EditMember page loads');
    }, [props.jobpostion.loading, props.locations.loading, props.teamzone.loading, props.allroutes.loading, props.routeslocation.loading, props.routesrole.loading]);

    useEffect(() => {
        if (userDetailsFlag == true) {
            getMemberDetailsByRowID(id);
        }
    }, [userDetailsFlag])

    const fetchPhoto = (folderid, fieldid) => {

        console.log('inside fetchPhoto');
        let raw = JSON.stringify({ "folderid": folderid, "fieldid": fieldid });
        let requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: raw
        };
        fetch(CONSTANTS.url.getMemberPhoto, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("fetchPhoto success", result);
                    let responseinfo = result.info;
                    if (responseinfo.hasOwnProperty("data") === true && responseinfo.data !== "") {
                        let data64 = btoa(result.info.data.reduce((data, byte) => data + String.fromCharCode(byte), ''))
                        let imagelink = "data:image/png;base64," + data64;
                        //setFields({ ...fields, ['profile_pic']: imagelink });
                        setProfilePic(imagelink);
                        //fields.profile_pic = imagelink;
                        console.log("image link ", imagelink);
                    } else {
                        console.log("Error in getting image link");
                    }
                    setPhotoMessage("");
                }, (error) => {
                    console.log("fetchPhoto error", error);
                }
            )

    }

    const getMemberDetailsByRowID = async (rowid) => {
        let requestOptions = {
            method: 'get',
            headers: { "Content-Type": "application/json" }
        };
        let returnResult = await fetch(CONSTANTS.url.memberDetail + "?id=" + rowid, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("fetchPhoto success", result);
                    setPhotoMessage("");
                    return result;
                }, (error) => {
                    console.log("fetchPhoto error", error);
                    return "";
                }
            )
        console.log("returnResult Member Details ", returnResult);

        if (returnResult == "") {
            setLoadingMessage("Something went wrong...");
            return "";
        }

        if (Object.keys(returnResult.data).lenght != 0) {
            let memberDetails = returnResult.data;

            console.log("memberDetails get details", JSON.stringify(memberDetails));
            if (memberDetails.hasOwnProperty("tags") === true && memberDetails.tags instanceof Array === false && memberDetails.tags !== null) {
                let tagString = memberDetails.tags;
                let tagArray = tagString.toString().split(',');
                let tagsItems = [];
                for (var i = 0; i < tagArray.length; i++) {
                    let itemTag = {};
                    if (tagArray[i] !== "") {
                        itemTag.name = tagArray[i];
                        itemTag.id = i + 1;
                        tagsItems.push(itemTag);
                    }

                }
                memberDetails.tags = tagsItems;


                //setTagsValue(tagsItems);
            } else {
                memberDetails.tags = [];
            }

            if (memberDetails.hasOwnProperty("teamzone") === true && memberDetails.teamzone instanceof Array == false && memberDetails.teamzone !== null) {
                let teamzoneString = memberDetails.teamzone;
                let teamzoneArray = teamzoneString.toString().split(',');
                memberDetails.teamzone = teamzoneArray;
            }

            if (memberDetails.hasOwnProperty("allteamzone") === true && memberDetails.allteamzone.lenght !== 0) {
                let allTeamId = [];
                for (var i = 0; i < memberDetails.allteamzone.length; i++) {
                    let itemTeamzoneId = memberDetails.allteamzone[i]["ROWID"];
                    allTeamId.push(itemTeamzoneId);
                }
                setMemberTimeZoneIds(allTeamId);
            }

            if (memberDetails.hasOwnProperty("roles") === true && memberDetails.roles.length !== 0) {
                let roleItems = [];
                let roleId = [];
                for (var i = 0; i < memberDetails.roles.length; i++) {
                    let itemRoles = {};
                    itemRoles.rating = memberDetails.roles[i]["rating"];
                    itemRoles.crm_role_id = memberDetails.roles[i]["crm_role_id"];
                    roleId.push(memberDetails.roles[i]["ROWID"]);
                    roleItems.push(itemRoles);
                }
                setMemberRoleId(roleId);
                //memberDetails.roles = roleItems;
                if (roleItems.length === 0) {
                    roleItems = [{ crm_role_id: "", rating: "" }];
                }
                setRolesInputList(roleItems);

                let selectedList = [...roleItems];
                let matchedData = _lodash.map(roleItems, 'crm_role_id');
                setRemoveRolesList(matchedData);

            }

            if (memberDetails.hasOwnProperty("document") === true && memberDetails.document.length !== 0) {
                let docItems = []
                for (var i = 0; i < memberDetails.document.length; i++) {
                    let docobj = {};
                    let itemdocid = memberDetails.document[i]["document_id"];
                    let file_name = memberDetails.document[i]["file_name"];
                    let itemdocUrl = CONSTANTS.url.documentFolderUrl + itemdocid + '/download';
                    docobj.url = itemdocUrl;
                    docobj.file_name = (file_name !== null && file_name !== undefined && file_name !== '') ? file_name : "Document";
                    docItems.push(docobj);
                }
                //memberDetails.document =docItems;
                setUploadedMemberDocument(docItems);
            }

            if (memberDetails.hasOwnProperty("profile_photo") === true) {
                console.log('has profile_photo', memberDetails.profile_photo);
                fetchPhoto(5170000000033073, memberDetails.profile_photo);
            } else {
                console.log('no profile_photo');
            }

            if(memberDetails.hasOwnProperty("location_type")===true){
                if(memberDetails.location_type===null || memberDetails.location_type===undefined || memberDetails.location_type==="" ){
                    memberDetails.location_type ="by_location";
                }
            }
            if(memberDetails.route!==null || memberDetails.route!==undefined || memberDetails.route!=="" ){
                let allRoutesDatainfo = props.allroutes.data;
                let routeInfo = _lodash.find(allRoutesDatainfo, { 'id': memberDetails.route });
                if(routeInfo !==undefined){
                    memberDetails.route ={"value":routeInfo.id,"label":routeInfo.Name};
                }else{
                    memberDetails.route =0;
                }
            }else{
                memberDetails.route =0;
            }
            //delete memberDetails.roles;
            //delete memberDetails.document;
            setFields(memberDetails);
            setLoadingMessage("");
        }


    }

    console.log("member fields ", JSON.stringify(fields));
    console.log("member documents ", uploadedMemberDocument);

    if (loadingLocation === false) {
        allLocation = props.locations.data;
        console.log("allLocation data info inside false ", allLocation.length)
    }

    if (loadingjobPosition === false) {
        alljobPosition = props.jobpostion.data;
        console.log("alljobPosition data info inside false ", alljobPosition.length)
    }

    if (loadingteamzone === false) {
        allTeamzone = props.teamzone.data;
        console.log("allTeamzone data info inside false ", allTeamzone.length)
    }

    if (loadingAllroutes === false) {
        let allRoutesData = props.allroutes.data;
        if (_lodash.size(allRoutesData) > 0) {
            allRoutesData.map((d, idx) => {
                allRoutes.push({ "value": d.id, "label": d.Name });
            });
        }
        console.log("allRoutes data info inside false ", allRoutes.length)
    }

    if (loadingRouteslocation === false) {
        allRouteslocation = props.routeslocation.data;
        console.log("allRouteslocation data info inside false ", allRouteslocation.length)
    }

    if (loadingRoutesrole === false) {
        allRoutesrole = props.routesrole.data;
        console.log("allRoutesrole data info inside false ", allRoutesrole.length)
    }


    if (loadingLocation == false && loadingjobPosition == false && loadingteamzone == false && loadingAllroutes == false && loadingRouteslocation == false && loadingRoutesrole == false) {
        dataLoadingMessage = "";
    }

    // onchange input
    const fieldInput = (event) => {
        let { name, value } = event.target;
        //console.log("Name:"+name+" Value:"+value);
        setFields((previousValue) => {
            return {
                ...previousValue,
                [name]: value
            }
        });
    }
    const selectCountry = (val) => {
        setFields({ ...fields, ["country"]: val });
    }

    const selectState = (val) => {
        setFields({ ...fields, ["state"]: val });
    }

    const teamZoneOnChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setFields({ ...fields, ["teamzone"]: value });
    }

    const onSelectProfilePic = (event) => {
        let photoExtType = ['png', 'jpg', 'jpeg'];
        let selectedFileUrl = URL.createObjectURL(profilePic.current.files[0]);
        console.log("profilePic current", profilePic.current.files[0]);
        console.log("selectedFileUrl", selectedFileUrl);
        //setMemberPhoto(selectedFileUrl);
        let photofileName = profilePic.current.files[0].name;
        let photofileExt = photofileName.substring(photofileName.lastIndexOf('.') + 1).toLowerCase();
        if (photoExtType.indexOf(photofileExt) <= -1) {
            //setFields({ ...fields, ['profile_pic']: CONSTANTS.url.defaultUserImage });
            setProfilePic(CONSTANTS.url.defaultUserImage);
            return;
        }
        setProfilePic(selectedFileUrl);
        //setFields({ ...fields, ['profile_pic']: selectedFileUrl });
    }

    const onSelectdocumentFiles = (event) => {
        let documentFilesNames = [];
        const files = documentFiles.current.files;
        for (let i = 0; i < files.length; i++) {
            documentFilesNames.push(files[i].name);
        }
        setMemberDocument(documentFilesNames);
    }

    const onDelete = (i) => {
        //console.log("onDelete tages",JSON.stringify(i));
        const tags = fields.tags.slice(0)
        tags.splice(i, 1);
        setFields({ ...fields, ['tags']: tags });
        //this.setState({ tags })
        console.log("onDelete tags", JSON.stringify(fields));
    }

    const onAddition = (tag) => {
        // console.log("Adding tages",JSON.stringify(tag));
        const tags = [].concat(fields.tags, tag);
        // //this.setState({ tags })
        setFields({ ...fields, ['tags']: tags });
        console.log("onAddition tags", JSON.stringify(fields));
    }

    const handleRolesInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rolesInputList];
        list[index][name] = value;
        setRolesInputList(list);
        let matchedData = _lodash.map(list, 'crm_role_id');
        setRemoveRolesList(matchedData);
    };

    // handle click event of the Remove button
    const handleRolesRemoveClick = (e, index) => {
        const list = [...rolesInputList];
        list.splice(index, 1);
        setRolesInputList(list);
        let matchedData = _lodash.map(list, 'crm_role_id');
        setRemoveRolesList(matchedData);
    };

    // handle click event of the Add button
    const handleRolesAddClick = () => {
        setRolesInputList([...rolesInputList, { crm_role_id: "", rating: "" }]);
    };

    const onUpdateMemberSubmit = (e) => {
        console.log("Update Member Submitted Data", JSON.stringify(fields));
        e.preventDefault();
        updateMember(fields);

    };

    const onChangeLocationType = (selectedOption) => {
        console.log(`Location type selected:`, selectedOption);
        setFields({ ...fields, ["location_type"]: selectedOption });
    }

    const onChangeRoute = (selectedOption) => {
        console.log(`Route type selected:`, selectedOption);
        let value = selectedOption.value;
        console.log(`Route type selected value:`, value);
        setFields({ ...fields, ["route"]: selectedOption });
    }


    const updateMember = (dataParms) => {
        setRmessage("Updating...");
        window.scrollTo({ behavior: 'smooth', top: '0px' });

        let docExtType = ['pdf', 'doc', 'docx', 'txt', 'xlsx', 'odt', 'png', 'jpg', 'jpeg'];
        let photoExtType = ['png', 'jpg', 'jpeg'];

        let raw = JSON.stringify(dataParms);
        const formData = new FormData();
        let fileuploadingErrors = {};
        let docFileCount = 0;
        let docFileExt = true;
        let docFileSizeStatus = true;
        let fileSizeLimit = 1048576;//1MB


        if (profilePic.current.files.length !== 0) {
            dataParms.photo = profilePic.current.files[0];
            let photofileName = profilePic.current.files[0].name;
            let photofileSize = profilePic.current.files[0].size;
            let photofileExt = photofileName.substring(photofileName.lastIndexOf('.') + 1).toLowerCase();
            if (photoExtType.indexOf(photofileExt) <= -1) {
                fileuploadingErrors.photo = "Please Upload only png,jpg,jpeg extension photo";
            }
            if (photofileSize > fileSizeLimit) {
                fileuploadingErrors.photo = "Please Upload profile photo less than 1MB";
            }
        }

        for (let i = 0; i < documentFiles.current.files.length; i++) {
            let docfileName = documentFiles.current.files[i].name;
            let docfileSize = documentFiles.current.files[i].size;
            formData.append("document", documentFiles.current.files[i]);
            docFileCount = docFileCount + 1;
            let docfileExt = docfileName.substring(docfileName.lastIndexOf('.') + 1).toLowerCase();
            if (docExtType.indexOf(docfileExt) <= -1) {
                docFileExt = false;
            }
            if (docfileSize > fileSizeLimit) {
                docFileSizeStatus = false;
            }
        }

        if (docFileCount > 8) {
            fileuploadingErrors.document = "Please upload maximum 8 document only";
            console.log("Document is more than 8");
        }
        console.log("docFileCount is", docFileCount);


        if (docFileSizeStatus === false) {
            fileuploadingErrors.document = "Please Upload document file less than 1MB.";
        }

        if (docFileExt === false) {
            fileuploadingErrors.document = "Please Upload only pdf,doc,zip,txt,xlsx and ppt extension document";
            //setRmessage("Some error occured uploading documents");
        }
        if (Object.keys(fileuploadingErrors).length) {
            setErrors(fileuploadingErrors);
            setRstatus(false);
            setRmessage("Some error occured.Please check");
            return;
        }
        delete dataParms.roles;
        delete dataParms.document;
        dataParms.member_roles = rolesInputList;
        dataParms.role_rowids = memberRoleId;
        dataParms.teamzoneids = memberTimeZoneIds;
        //dataParms.team_member_id = id;
        dataParms.ROWID = id;
        for (const [key, value] of Object.entries(dataParms)) {
            //console.log(`key ${key}: value ${value}`);
            if (key === 'tags' || key === 'teamzone' || key === "member_roles" || key === "role_rowids" || key === "teamzoneids") {
                formData.append(key, JSON.stringify(value));
            }  else if(key === 'route' && value !="" ){
                formData.append(key, JSON.stringify(value));
            }else {
                formData.append(key, value);
            }
        }

        let requestOptions = {
            method: 'POST',
            body: formData
        };
        let data = {};
        fetch(CONSTANTS.url.updateMemberUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                //console.warn("Update API Results warn", JSON.parse(result));
                let resultData = JSON.parse(result);
                //console.log("Update API Results ", resultData.status);
                if (resultData.status === 200) {
                    data.errors = {};
                    data.data = {};
                    //setFields(data.errors);
                    setErrors(data.errors);
                    setRmessage(resultData.message);
                    setRstatus(true);
                    props.allTeamMembers(paginationParams);
                    setTimeout(function () {
                        setRmessage('');
                        history.push(`/admin/member/edit/${id}`);
                        //window.location.reload();
                    }, 5000);
                }
                if (resultData.status !== 200) {
                    //console.warn("error by api ", JSON.parse(resultData.status));
                    setErrors(resultData.errors);
                    setRmessage(resultData.message);
                    setRstatus(false);
                }
            }).catch(error => {
                //console.log('"Register API Results error', JSON.stringify(error));
                data.errors = error;
                data.data = JSON.parse(raw);
            });
    }

    //console.log("allMembers",JSON.stringify(allMembers));
    if (rStatus === false) {
        successMessage = { color: "#dc3545", textAlign: "center", margin: "0" };
    } else {
        successMessage = { color: "green", textAlign: "center", margin: "0" };
    }

    return (
        <React.Fragment>
            <div className="content card-padding-0">
                <form onSubmit={onUpdateMemberSubmit} method="post" name="updatemember" encType="multipart/form-data">
                    <Row>
                        <Col md="4">
                            <Card className="card-user">
                                <CardBody>
                                    <div className="container">
                                        <Row>
                                            <Col className="" md="12">
                                                {photoMessage}
                                                <div className="image" >
                                                    <img style={{ display: "none" }}
                                                        alt="..."
                                                        src={(profile_pic !== "") ? profile_pic : CONSTANTS.url.defaultUserImage}
                                                    />
                                                </div>

                                                <div className="author">
                                                    <img alt="..." className="avatar border-gray" src={(profile_pic !== "") ? profile_pic : CONSTANTS.url.defaultUserImage} />

                                                    <input type="file" accept=".png, .jpg, .jpeg" ref={profilePic} onChange={onSelectProfilePic} className="form-control" />
                                                    <ErrorMessage errors={errors} fieldName="photo" />
                                                    {/* {(memberPhoto) ? <Button className="btn-round" color="primary" type="submit"> Update Photo</Button> : ""} */}
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                            {/* </form> */}
                        </Col>

                        <Col md="8">

                            <Card className="card-user">
                                <CardHeader>
                                    <div className="container">
                                        <Row>
                                            <Col className="" md="12">

                                                <CardTitle tag="h5">Edit Member</CardTitle>
                                                {
                                                    ((rMessage != null)) ? <h4 style={successMessage} id="successM" >{rMessage}</h4> : ""
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="container">
                                        {(loadingMessage == "") ? <React.Fragment>
                                            <Row>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="username">UserName</label>
                                                        <input type="text" name="username" className="form-control" id="username" placeholder="Enter Username" value={fields.username} readOnly={true} />
                                                        <ErrorMessage errors={errors} fieldName="username" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="first_name">First Name</label>
                                                        <input type="text" name="first_name" className="form-control" id="first_name" placeholder="Enter Firstname" onChange={fieldInput} value={fields.first_name} />
                                                        <ErrorMessage errors={errors} fieldName="first_name" />
                                                    </FormGroup>
                                                </Col>

                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="last_name">Last Name</label>
                                                        <input type="text" name="last_name" className="form-control" id="last_name" placeholder="Enter Lastname" onChange={fieldInput} value={fields.last_name} />
                                                        <ErrorMessage errors={errors} fieldName="last_name" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="email">Email address</label>
                                                        <input type="email" name="email" className="form-control" id="email" placeholder="Enter Email" readOnly={true} value={fields.email} />
                                                        <ErrorMessage errors={errors} fieldName="email" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="phone_number">Phone Number</label>
                                                        <input type="text" name="phone_number" className="form-control" id="phone_number" placeholder="Enter Phone Number" onChange={fieldInput} value={fields.phone_number} />
                                                        <ErrorMessage errors={errors} fieldName="phone_number" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="mobile_number">Mobile Number</label>
                                                        <input type="text" name="mobile_number" className="form-control" id="mobile_number" placeholder="Enter Mobile Number" onChange={fieldInput} value={fields.mobile_number} />
                                                        <ErrorMessage errors={errors} fieldName="mobile_number" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label htmlFor="address_line_1">Address Line 1</label>
                                                        <input type="text" name="address_line_1" className="form-control" id="address_line_1" placeholder="Enter Address Line 1" onChange={fieldInput} value={fields.address_line_1} />
                                                        <ErrorMessage errors={errors} fieldName="address_line_1" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label htmlFor="address_line_2">Address Line 2</label>
                                                        <input type="text" name="address_line_2" className="form-control" id="address_line_2" placeholder="Enter Address Line 2" onChange={fieldInput} value={fields.address_line_2} />
                                                        <ErrorMessage errors={errors} fieldName="address_line_2" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="country">Country</label>
                                                        <CountryDropdown value={fields.country} onChange={(val) => selectCountry(val)} name="country" className="form-control" />
                                                        <ErrorMessage errors={errors} fieldName="country" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="state">State</label>
                                                        <RegionDropdown value={fields.state} country={fields.country} onChange={(val) => selectState(val)} className="form-control" />
                                                        <ErrorMessage errors={errors} fieldName="state" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="city">City</label>
                                                        <input type="text" name="city" className="form-control" id="city" placeholder="Enter City" onChange={fieldInput} value={fields.city} />
                                                        <ErrorMessage errors={errors} fieldName="city" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="zipcode">Zip Code</label>
                                                        <input type="text" name="zipcode" className="form-control" id="zipcode" placeholder="Enter Zip Code" onChange={fieldInput} value={fields.zipcode} />
                                                        <ErrorMessage errors={errors} fieldName="zipcode" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="availability">Availability</label>

                                                        <select name="availability" className="form-control" id="availability" onChange={fieldInput} value={fields.availability || ""}>
                                                            <option value="">Select availability</option>
                                                            <option value="always">Always Available</option>
                                                            <option value="mostly">Mostly Available</option>
                                                            <option value="sometimes">Sometimes Available</option>
                                                            <option value="rarely">Rarely Available</option>
                                                        </select>
                                                        <ErrorMessage errors={errors} fieldName="availability" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="4">
                                                    <FormGroup>
                                                        <label htmlFor="location_type">Location Type</label>
                                                        <select name="location_type" className="form-control" id="location_type" onChange={fieldInput} value={(fields.location_type !=="" && fields.location_type !==null && fields.location_type !==undefined )?fields.location_type: "by_location"}>
                                                            <option value="by_location">Location</option>
                                                            <option value="by_route">Route</option>
                                                        </select>
                                                        <ErrorMessage errors={errors} fieldName="location_type" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="6">
                                                    {(fields.location_type === "by_location") ?
                                                        <FormGroup>
                                                            <label htmlFor="location">Location</label>
                                                            <select name="location" className="form-control" id="location" onChange={fieldInput} value={fields.location || ""}>
                                                                <option value="">Select Location</option>
                                                                {(dataLoadingMessage === "") ?
                                                                    allLocation.map((d, idx) => (
                                                                        <React.Fragment>
                                                                            <option value={d.id}>{d.Account_Name}</option>
                                                                        </React.Fragment>
                                                                    ))
                                                                    : ""}

                                                            </select>
                                                            <ErrorMessage errors={errors} fieldName="location" />
                                                        </FormGroup>
                                                        : ""}
                                                    {(fields.location_type === "by_route") ?
                                                        <FormGroup >
                                                            <label htmlFor="location">Route</label>
                                                            <Select isMulti={false} name="route" placeholder="Search Route" value={fields.route} onChange={e => { onChangeRoute(e) }} options={allRoutes} />
                                                            <ErrorMessage errors={errors} fieldName="route" />
                                                        </FormGroup>
                                                        : ""}
                                                </Col>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label htmlFor="tags">Tags</label>
                                                        <ReactTags
                                                            ref={memberTags}
                                                            tags={fields.tags}
                                                            suggestions={tagsSuggestions}
                                                            onDelete={onDelete}
                                                            onAddition={onAddition}
                                                            allowNew={true}
                                                            autoresize={false}
                                                            className={"form-control"}
                                                        />

                                                        <ErrorMessage errors={errors} fieldName="tags" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label htmlFor="teamzone">Team/Zone</label>
                                                        <select name="teamzone" multiple={true} className="form-control" id="teamzone" onChange={teamZoneOnChange} value={fields.teamzone || []}
                                                        >
                                                            {(dataLoadingMessage === "") ?
                                                                allTeamzone.map((d, idx) => (
                                                                    <React.Fragment>
                                                                        <option value={d.id}>{d.Name}</option>
                                                                    </React.Fragment>
                                                                ))
                                                                : ""}

                                                        </select>
                                                        <ErrorMessage errors={errors} fieldName="teamzone" />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="" md="6">
                                                    <FormGroup>
                                                        <label htmlFor="notes">Notes</label>
                                                        <textarea name="notes" onChange={fieldInput} value={fields.notes} className="form-control" id="notes" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className=" roles_box_wrap members" md="12">
                                                    <p><b>Job Position</b></p>
                                                    {rolesInputList.map((x, i) => {
                                                        //console.log("rolesInputList loop",JSON.stringify(x));
                                                        return (
                                                            <React.Fragment>
                                                                <div className="roles_box">
                                                                    <div className="alignLeft fieldsData">
                                                                        <label>Role (Job Position)</label>
                                                                        <select name="crm_role_id" className="form-control" id="crm_role_id" onChange={e => handleRolesInputChange(e, i)} value={x.crm_role_id || ""}>
                                                                            <option value="">Select Job Position</option>
                                                                            {(dataLoadingMessage === "") ?
                                                                                alljobPosition.map((d, idx) => (
                                                                                    <React.Fragment>
                                                                                        <option className={(removeRolesList.includes(d.id)) ? "opthide" : ""} value={d.id}>{d.Name}</option>
                                                                                    </React.Fragment>
                                                                                ))
                                                                                : ""}
                                                                        </select>
                                                                    </div>
                                                                    <div className="alignLeft fieldsData">
                                                                        <label>Rating</label>
                                                                        <select name="rating" className="form-control" id="rating" onChange={e => handleRolesInputChange(e, i)} value={x.rating || ""}>
                                                                            <option value="">Select Rating</option>
                                                                            <option value="Beginner">Beginner</option>
                                                                            <option value="Intermediate">Intermediate</option>
                                                                            <option value="Expert">Expert</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="alignLeft btn-box">
                                                                        {rolesInputList.length !== 1 && <button className="btn-round btn btn-primary" type="button" onClick={e => handleRolesRemoveClick(e, i)}>Remove</button>}
                                                                    </div>
                                                                    <div className="addButtonWrap">
                                                                        {rolesInputList.length - 1 === i && <button className="btn-round btn btn-primary" onClick={handleRolesAddClick}>Add</button>}
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                    }
                                                    <ErrorMessage errors={errors} fieldName="member_roles" />
                                                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(rolesInputList)}</div> */}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className=" roles_box_wrap members" md="12">
                                                    <p><b>Upload Documents</b></p>
                                                    <ol>
                                                        {(uploadedMemberDocument.length !== 0) ?
                                                            uploadedMemberDocument.map((d, idx) => (
                                                                //`Document ${idx + 1}`
                                                                <React.Fragment>
                                                                    <li>{d.file_name}:<a href={d.url} target="_blank">Download</a></li>
                                                                </React.Fragment>
                                                            ))
                                                            : ""}
                                                        {(memberDocument.length !== 0) ?
                                                            memberDocument.map((d, idx) => (
                                                                <React.Fragment>
                                                                    <li>{d}</li>
                                                                </React.Fragment>
                                                            ))
                                                            : ""}
                                                    </ol>
                                                    <label>Upload Multiple File by Ctrl+Select file (Max 8 files)</label><br />
                                                    <input type="file" accept=".png, .jpg, .jpeg,.doc, .docx, .xml, .pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" ref={documentFiles} onChange={onSelectdocumentFiles} multiple className="form-control" />
                                                    <ErrorMessage errors={errors} fieldName="document" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <div className="update ml-auto mr-auto">
                                                    <Button className="btn-round" color="primary" type="submit"
                                                    > Update Member</Button>
                                                </div>
                                            </Row>
                                        </React.Fragment> : <Row><Col md="12">{loadingMessage}</Col></Row>}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </div>
        </React.Fragment>
    )
}

function MemberDetails(props) {
    const dispatch = useDispatch();
    let history = useHistory();
    let successMessage = { color: "green" };
    const [rMessage, setRmessage] = useState(null);
    const [rStatus, setRstatus] = useState(true);
    let paginationParams = { data_limit: CONSTANTS.recordLimit, page: 1 };
    let locationName = '';
    const { ROWID, full_name, team_member_id, first_name, last_name, email, count, location_name } = props.data;
    console.log("MemberDetails propes", JSON.stringify(props))

    const deleteMember = async () => {
        let { ROWID, team_member_id } = props.data
        setRmessage("Deleting...");
        let ids = { rowid: ROWID, userid: team_member_id };
        console.log("delete button clicked", ids);
        let dataParms = { ids: ids };
        let raw = JSON.stringify(dataParms);
        //console.log("Function called registerusers", JSON.stringify(raw));
        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw
        };
        let data = {};
        fetch(CONSTANTS.url.deleteMemberUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                let resultData = JSON.parse(result);
                if (resultData.status == 200) {
                    dispatch(getMembers(paginationParams))
                    setTimeout(function () {
                        setRmessage('');
                        history.push(`/admin/member/all`);
                    }, 1000);
                }
            }).catch(error => {
                //console.log('"Register API Results error', JSON.stringify(error));
                setRmessage('Error in deleting..');
                data.errors = error;
                data.data = JSON.parse(raw);
            });
    }

    return (
        <tr>
            <td className="pl-4">{count}</td>
            <td>
                <h5 className="font-medium mb-0">{full_name}</h5>
            </td>
            <td>
                <span className="text-muted">{email}</span><br />
            </td>
            <td>
                <span className="text-muted">{location_name}</span><br />

            </td>
            <td>
                {rMessage}
                <NavLink exact activeClassName="active" className='' to={`/admin/member/edit/${ROWID}`}><button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fa fa-edit"></i> </button></NavLink>
                <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" onClick={(e) => { window.confirm("Are you sure you wish to delete this item?") && deleteMember(props) }}><i className="fa fa-trash"></i> </button>
            </td>
        </tr>
    );
}

function TeamMemberListing(props) {
    let dispatch = useDispatch();
    const allFields = { "first_name": "", "last_name": "", "email": "", "tags": "", "username": "", "phone_number": "", "mobile_number": "", "address_line_1": "", "address_line_2": "", "country": "", "state": "", "city": "", "zipcode": "", "teamzones": "", "availability": "", "locations": "", "roles": "" };
    const [error, setError] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [startRecordIndex, setStartRecordIndex] = useState(1);
    const [endRecordIndex, setEndRecordIndex] = useState(CONSTANTS.recordLimit);
    const [dataLimit, setDataLimit] = useState(CONSTANTS.recordLimit);
    const [fields, setFields] = useState(allFields);
    const [searchLoading, setSearchLoading] = useState('');
    const [loadingData, setLoadingData] = useState('');
    const [sortData, setSortData] = useState({});

    let totalDataCount = 0;
    let pageLimit = 3;
    let allMembers = [];
    let showAllMembers = [];
    let allMembersCount = 0;
    let totalPages = 0;
    let startRecordNo = 0;
    let endRecordNo = 0;
    let lastPageNo = 0;
    let fisrtPageNo = 0;
    let loadingMember = props.allmembers.loading;
    let textSearching = '';
    console.log("loadingMember ", loadingMember);

    const [crmLocation, setCrmLocation] = useState([]);
    const [crmjobPosition, setCrmjobPosition] = useState([]);
    const [crmTeamzone, setCrmTeamzone] = useState([]);
    let locationOptions = [];
    let teamzoneOptions = [];
    let rolesOptions = [];

    let memberSearchData = { ...fields, data_limit: dataLimit, page: currentPage };
    if (memberSearchData.hasOwnProperty("locations") && memberSearchData.locations != "") {
        let locids = _lodash.map(memberSearchData.locations, 'value');
        memberSearchData.locations = locids.toString();
    }
    if (memberSearchData.hasOwnProperty("teamzones") && memberSearchData.teamzones != "") {
        let teamzoneids = _lodash.map(memberSearchData.teamzones, 'value');
        memberSearchData.teamzones = teamzoneids.toString();
    }

    if (memberSearchData.hasOwnProperty("roles") && memberSearchData.roles != "") {
        let rolesids = _lodash.map(memberSearchData.roles, 'value');
        memberSearchData.roles = rolesids.toString();
    }

    //route change
    useEffect(() => {
        if (props.locations.loading === true || props.jobpostion.loading === true || props.teamzone.loading === true) {
            setLoadingData("Loading information...");
        }

        if (props.locations.loading === true) {
            props.allAccountLocation();
        }
        if (props.jobpostion.loading === true) {
            props.allJobposition();
        }
        if (props.teamzone.loading === true) {
            props.allTeamzone();
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

        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false) {
            setLoadingData('');
        }

    }, []);

    //page reload
    useEffect(() => {

        if (props.locations.loading === true || props.jobpostion.loading === true || props.teamzone.loading === true) {
            setLoadingData("Loading information...");
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

        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false) {
            setLoadingData('');
        }
    }, [props.locations.loading, props.jobpostion.loading, props.teamzone.loading]);


    if (_lodash.size(crmLocation) !== 0) {
        crmLocation.map((d, idx) => {
            locationOptions.push({ "value": d.id, "label": d.Account_Name });
        });
    }

    if (_lodash.size(crmjobPosition) !== 0) {
        crmjobPosition.map((d, idx) => {
            rolesOptions.push({ "value": d.id, "label": d.Name });
        });
    }

    if (_lodash.size(crmTeamzone) !== 0) {
        crmTeamzone.map((d, idx) => {
            teamzoneOptions.push({ "value": d.id, "label": d.Name });
        });
    }

    //on pagination change
    useEffect(() => {
        console.log("startRecordIndex  ", startRecordIndex);
        console.log("endRecordIndex ", endRecordIndex);
        paginateMemberInfo();
    }, [currentPage, startRecordIndex, endRecordIndex]);

    const paginateMemberInfo = async () => {
        setLoadingData("Loading information....");
        let info = await dispatch(getMembers(memberSearchData));
        setSortData({});
        window.scrollTo({ behavior: 'smooth', top: '0px' });
        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false) {
            setLoadingData('');
        }
    }

    console.log("members data info ", props.allmembers.loading);
    // mapping of data and paignation 
    if (loadingMember === false) {
        allMembers = props.allmembers.data;
        allMembersCount = props.allmembers.data.length;
        totalDataCount = props.allmembers.total_member;
        totalPages = props.allmembers.total_pages;
        //loadingText = props.allmembers.message;
        endRecordNo = endRecordIndex;
        startRecordNo = startRecordIndex;

        if (endRecordIndex >= totalDataCount) {
            endRecordNo = totalDataCount;
        }

        allMembers.map((d, idx) => {
            let location_name = "";
            let full_name = d.first_name + " " + d.last_name;
            let locationInfo = _lodash.find(crmLocation, { 'id': d.location });
            if (locationInfo !== undefined) {
                location_name = locationInfo.Account_Name;
            }
            allMembers[idx]["location_name"] = location_name;
            allMembers[idx]["full_name"] = full_name;
            showAllMembers.push(allMembers[idx]);
        })

        //console.log("sortByColumn",JSON.stringify(sortData));

        if (Object.keys(sortData).length !== 0) {
            let sortKey = Object.keys(sortData);
            let sortValue = Object.values(sortData);
            //console.log("sortData K", JSON.stringify(sortKey));
            //console.log("sortData V", JSON.stringify(sortValue));
            showAllMembers = _lodash.orderBy(allMembers, sortKey, sortValue);
            //console.log("showAllMembers",JSON.stringify(showAllMembers));
        }
    }

    const sortByColumn = (column) => {
        if (sortData.hasOwnProperty(column) === false) {
            setSortData({ [column]: "desc" });
        } else if (sortData.hasOwnProperty(column) && sortData[column] === "desc") {
            setSortData({ [column]: "asc" })
        } else if (sortData.hasOwnProperty(column) && sortData[column] === "asc") {
            setSortData({ [column]: "desc" });
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
        //let startoffset = startIndex+1;
        //console.log("startoffset ",startoffset);
        //console.log("startIndex ",startIndex);
        //console.log("endIndex ",endIndex);
        //console.log("totalPages ",totalPages);
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
    console.log("textSearching outside ", textSearching);
    //console.log("lastPageNo", lastPageNo);
    //console.log("fisrtPageNo", fisrtPageNo);

    const onChangeFilterLocation = (selectedOption) => {
        console.log(`Location selected:`, selectedOption);
        setFields({ ...fields, ["locations"]: selectedOption });
    }

    const onChangeFilterTeamzone = (selectedOption) => {
        console.log(`Teamzone selected:`, selectedOption);
        setFields({ ...fields, ["teamzones"]: selectedOption });
    }

    const onChangeFilterRoles = (selectedOption) => {
        console.log(`Roles selected:`, selectedOption);
        setFields({ ...fields, ["roles"]: selectedOption });

    }

    const onChangeFilterFields = (event) => {
        let { name, value, checked } = event.target;
        console.log("name " + name + " " + "value " + value + " " + "checked " + checked + " ");
        setFields((previousValue) => {
            return {
                ...previousValue,
                [name]: value
            }
        });
    }

    const searchMember = async (reset = false) => {
        setCurrentPage(1);
        setLoadingData("Searching members...")
        console.log("searchMember Fields Data", JSON.stringify(fields));
        memberSearchData = { ...memberSearchData, ...fields };
        if (reset === true) {
            memberSearchData = { page: 1, data_limit: CONSTANTS.recordLimit, first_name: "", last_name: "", email: "", tags: "", username: "", phone_number: "", mobile_number: "", address_line_1: "", address_line_2: "", country: "", state: "", city: "", zipcode: "", teamzones: "", availability: "", locations: "", roles: "" };
            console.log("Reset Fields Data", JSON.stringify(memberSearchData));
        }

        if (memberSearchData.hasOwnProperty("locations") && memberSearchData.locations !== "") {
            let locids = _lodash.map(memberSearchData.locations, 'value');
            memberSearchData.locations = locids.toString();
        }
        if (memberSearchData.hasOwnProperty("teamzones") && memberSearchData.teamzones !== "") {
            let teamzoneids = _lodash.map(memberSearchData.teamzones, 'value');
            memberSearchData.teamzones = teamzoneids.toString();
        }

        if (memberSearchData.hasOwnProperty("roles") && memberSearchData.roles !== "") {
            let rolesids = _lodash.map(memberSearchData.roles, 'value');
            memberSearchData.roles = rolesids.toString();
        }
        console.log("memberSearchData Fields Data", JSON.stringify(memberSearchData));

        let info = await dispatch(getMembers(memberSearchData));
        setSortData({});
        window.scrollTo({ behavior: 'smooth', top: '0px' });
        if (props.locations.loading === false && props.jobpostion.loading === false && props.teamzone.loading === false) {
            setLoadingData('');
        }
        if (info.payload.total_member === 0) {
            setSearchLoading("No member found...")
        }
    }
    const onSearchSubmit = (e) => {
        e.preventDefault();
        searchMember(false);
    }

    const resetSearchForm = (e) => {
        e.preventDefault();
        console.log("reset button clicked...");
        setFields({ first_name: "", last_name: "", email: "", tags: "", username: "", phone_number: "", mobile_number: "", address_line_1: "", address_line_2: "", country: "", state: "", city: "", zipcode: "", teamzones: "", availability: "", locations: "", roles: "" });
        //console.log("Reset fields",fields);
        searchMember(true);
    }

    return (
        <React.Fragment>
            <div className="content card-padding-0">
                <Card className="card-user">
                    <CardHeader>
                        <div className="container">
                            <Row>
                                <Col className="pr-1" md="12">
                                    <CardTitle tag="h5">All Members</CardTitle>
                                </Col>
                            </Row>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="container">
                            <form onSubmit={onSearchSubmit} method="get" name="membersearch">
                                <Row>
                                    <Col md="3">
                                        <FormGroup>
                                            <label htmlFor="username">Email</label>
                                            <input type="email" name="email" className="form-control" id="eamil" placeholder="Search email" value={fields.email} onChange={onChangeFilterFields} />
                                        </FormGroup>
                                    </Col>

                                    <Col md="3">
                                        <FormGroup>
                                            <label htmlFor="locations">Location</label>
                                            <Select isMulti={true} name="locations" placeholder="Search Location" value={fields.locations} onChange={e => { onChangeFilterLocation(e) }} options={locationOptions}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md="3">
                                        <FormGroup>
                                            <label htmlFor="teamzones">Teamzone</label>
                                            <Select isMulti={true} name="teamzones" placeholder="Search Teamzone" value={fields.teamzones} options={teamzoneOptions} onChange={e => { onChangeFilterTeamzone(e) }}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md="3">
                                        <FormGroup>
                                            <label htmlFor="roles">Roles</label>
                                            <Select isMulti={true} name="roles" placeholder="Search Roles" value={fields.roles} onChange={e => { onChangeFilterRoles(e) }} options={rolesOptions}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Button className="btn-round" color="primary" type="submit"> Search</Button>&nbsp;&nbsp;&nbsp;
                                        <Button onClick={resetSearchForm} className="btn-round" color="primary" type="reset">Reset</Button>
                                    </Col>
                                    <Col md="3">

                                    </Col>
                                </Row>
                            </form>
                            <Row>
                                <Col md="12">
                                    <div className="">
                                        <h5 className="card-title text-uppercase mb-0">{props.name}</h5>
                                    </div>

                                    <div className="table-responsive">
                                        {loadingData}
                                        <table className="table no-wrap user-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                                                    <th scope="col" className="border-0 text-uppercase font-medium" onClick={() => { sortByColumn("full_name") }}>
                                                        Name
                                                        <span className="sortIcon">
                                                            {(sortData.hasOwnProperty("full_name") && sortData.full_name == "asc") ? <i class="fa fa-sort-up"></i> : (sortData.hasOwnProperty("full_name") && sortData.full_name == "desc") ? <i class="fa fa-sort-down"></i> : ""}
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="border-0 text-uppercase font-medium" onClick={() => { sortByColumn("email") }}>
                                                        Email
                                                        <span className="sortIcon">
                                                            {(sortData.hasOwnProperty("email") && sortData.email == "asc") ? <i class="fa fa-sort-up"></i> : (sortData.hasOwnProperty("email") && sortData.email == "desc") ? <i class="fa fa-sort-down"></i> : ""}
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="border-0 text-uppercase font-medium" onClick={() => { sortByColumn("location_name") }}>
                                                        Location
                                                        <span className="sortIcon">
                                                            {(sortData.hasOwnProperty("location_name") && sortData.location_name == "asc") ? <i class="fa fa-sort-up"></i> : (sortData.hasOwnProperty("location_name") && sortData.location_name == "desc") ? <i class="fa fa-sort-down"></i> : ""}
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (allMembersCount > 0) ? showAllMembers.map((d, idx) => {
                                                        return (
                                                            <React.Fragment >
                                                                <MemberDetails key={idx} data={d} />
                                                            </React.Fragment >
                                                        );
                                                    }) : <tr><td colSpan="5">{searchLoading}</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
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
                        </div>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment >
    )
}

const mapStateToProps = (state) => {
    //console.log("All State Data " + JSON.stringify(state));
    return {
        allmembers: state.allmembers,
        locations: state.locations,
        jobpostion: state.jobpostion,
        teamzone: state.teamzone,
        allroutes: state.allroutes,
        routeslocation: state.routeslocation,
        routesrole: state.routesrole
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        allTeamMembers: (data) => { dispatch(getMembers(data)) },
        allAccountLocation: () => { dispatch(allAccountLocation()) },
        allJobposition: () => { dispatch(allJobposition()) },
        allTeamzone: () => { dispatch(allTeamzone()) },
        allRoutesInfo: () => { dispatch(allRoutes()) },
        allRouteLocation: () => { dispatch(routeLocation()) },
        allrouteRoles: () => { dispatch(routeRoles()) }
    }
}

let AddUsersEx = connect(mapStateToProps, mapDispatchToprops)(AddUsers);
let TeamMemberListingEx = connect(mapStateToProps, mapDispatchToprops)(TeamMemberListing);
let EditMemberEx = connect(mapStateToProps, mapDispatchToprops)(EditMember);
export { AddUsersEx, TeamMemberListingEx, EditMemberEx };