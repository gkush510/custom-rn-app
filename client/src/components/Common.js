import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export function ErrorMessage(props) {
    let alignleftCSS = { textAlign: "left" };
    let { errors, fieldName } = props;
    return (
        ((errors != null) && (errors[fieldName] != null)) ? <small style={alignleftCSS} id={`errorfield-${fieldName}`} className="text-danger">{errors[fieldName]}</small> : ""
    );
}

export function LinkTag(props) {
    let linkPath = props.path;
    let linkName = props.name;
    let classes = props.classes;
    return (
        <React.Fragment>
            <NavLink exact activeClassName="active" className={classes} to={linkPath}>{linkName}</NavLink>
        </React.Fragment>
    );
}

export function NotFound404(props) {
    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <h1>{props.title}</h1>
                <h4>{props.message}</h4>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export function searchArrayRowValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].ROWID === value) {
            return myArray[i];
        }
    }
}

export function searchArraykeyValue(key ,value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][key] === value) {
            return myArray[i];
        }
    }
}

export function TeamMemberCalloutPagination({ data, RenderComponent, title, pageLimit, dataLimit,showPage="" }) {
    const [totalPages] = useState(Math.round(data.length / dataLimit));
    const [startRecordIndex, setStartRecordIndex] = useState(1);
    const [endRecordIndex, setEndRecordIndex] = useState(dataLimit);
    console.log("Total pages", totalPages);
    console.log("DataLimit ", dataLimit);
    console.log("pageLimit ", pageLimit);
    const [currentPage, setCurrentPage] = useState((showPage !=="")?showPage:1);

    let lastPageNo      = 0;
    let fisrtPageNo     = 0;
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    function goToNextPage() {
        //setCurrentPage((page) => page + 1);
        setCurrentPage((page) => {
            let endInx = (page + 1) * dataLimit;
            let startInx = endInx - (dataLimit - 1)
            setStartRecordIndex(startInx);
            setEndRecordIndex(endInx);
            return page + 1;
        });
    }

    function goToPreviousPage() {
        //setCurrentPage((page) => page - 1);
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

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = (pageLimit, totalPages) => {
        //let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        //return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
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

            {/* show the posts, 10 posts at a time */}
            <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                            <th scope="col" className="border-0 text-uppercase font-medium">Teamzone</th>
                            <th scope="col" className="border-0 text-uppercase font-medium">Location</th>
                            <th scope="col" className="border-0 text-uppercase font-medium">Role</th>
                            <th scope="col" className="border-0 text-uppercase font-medium">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPaginatedData().map((d, idx) => (
                            <RenderComponent key={idx} data={d} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination" >
                {/* previous button */}
                <button onClick={goToPreviousPage} className={`prev page-link ${(allpages.lenght === 0 || allpages.lenght === 1 || currentPage === 1) ? 'hide' : ''} ${currentPage === 1 ? 'disabled' : ''}`} >
                    Prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup(pageLimit, totalPages).map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next page-link  ${lastPageNo === totalPages ? 'hide' : ''} ${currentPage === totalPages ? 'disabled' : ''}`}>
                    Next
                </button>
            </div>
        </React.Fragment>
    );
}