/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Modal, Button } from "react-bootstrap";
import { json } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { useRef } from "react";

function ComplaintList() {
  const [userdata, setuserdata] = useState([]);
  
  const [responseData, setresponse] = useState("");
  
  const [name, setname] = useState("");

  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");

  const [show, setShow] = useState(false);
  const currentPage = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setsearch] = useState();
  const [auth, setauth] = useState(false);
  const [paginationList, setPaginationList] = useState("");
  const [limitdata, setlimitdata] = useState(2);

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      setauth(true);
      showdata();
    } else {
      setauth(false);
    }
    currentPage.current = 1;
  }, []);
  function showAlert() {
    Swal.fire({
      title: "Success",
      text: "Data Save Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
  function showdata(id = undefined) {
    if (id != undefined) {
      handleShow();
      fetch(`http://localhost:5000/compliantdata/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
      })
        .then((Response) => {
          return Response.json();
        })
        .then((response) => {
          if (response.status == 200) {

             response.data.map((item) => {
              
            });
          } else {
           
          }
        });
    } else {
      fetch("http://localhost:5000/compliantdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ page: currentPage.current, limit: limitdata }),
      })
        .then((Response) => {
          return Response.json();
        })
        .then((response) => {
          if (response.status == 200) {
            // custom pagination
            setPaginationList(response.result.paginationList);
            setuserdata(response.data);
            //end custom pagination
           
          } else {
            setresponse(response.data);
          }
        });
    }
  }
  function handlePageClick(e) {
    console.log(e.selected + 1);
    currentPage.current = e.selected + 1;
    showdata();
  }

  useEffect(() => {
    if (limitdata == 0 || limitdata == "") {
      setlimitdata(2);
      showdata();
    } else {
      showdata();
    }
  }, [limitdata]);
 
  return (
    <>
      {auth == true ? (
        <div className="content ">
          <Row>
            <Col lg="12">
              <Card className="table-container">
                <CardHeader className="d-flex justify-content-between">
                  <CardTitle tag="h4">Complaint Data</CardTitle>
                </CardHeader>

                <div className="col-5 m-1">
                  Set Limit Data :{" "}
                  <input
                    type="text"
                    defaultValue={limitdata}
                    onChange={(e) => setlimitdata(e.target.value)}
                  />
                </div>
                <table className="  m-3 text-center p-3">
                  <thead className="text-primary ">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Adhar Number</th>
                      <th>Complaints </th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData == "" ? (
                      userdata.map((value) => {
                        return (
                          <>
                            <tr key={value._id}>
                              <td>{value._id}</td>
                              <td>{value.name}</td>
                              <td>{value.email}</td>
                              <td>{value.adhar_number}</td>
                              <td>{value.compliant_text}</td>
                              
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <h1> {responseData} </h1>
                    )}
                  </tbody>
                </table>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={paginationList}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  marginPagesDisplayed={"450px"}
                  containerClassName="pagination justify-content-end"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  forcePage={currentPage.current - 1}
                />
              </Card>
            </Col>
          </Row>

        </div>
      ) : (
        <div className="content">
          <Row>
            <Col lg="12">
              <Card>
                <h1>Access Denied</h1>
              </Card>
            </Col>{" "}
          </Row>
        </div>
      )}
    </>
  );
}

export default ComplaintList;
