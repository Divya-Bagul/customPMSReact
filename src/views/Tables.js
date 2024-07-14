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

function Tables() {
  const [userdata, setuserdata] = useState([]);
  const [filterData, setfilterData] = useState([]);

  const [responseData, setresponse] = useState("");
  const [editdata, seteditdata] = useState([]);
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
      fetch(`http://localhost:5000/userdata/${id}`, {
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
            seteditdata(response.data);
            setfilterData(response.data);
            response.data.map((item) => {
              setname(item.name);
              setemail(item.email);
              setnumber(item.phone);
            });
          } else {
            seteditdata([]);
          }
        });
    } else {
      fetch("http://localhost:5000/userdata", {
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
            setfilterData(response.data);
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
  const columns = [
    {
      name: "id",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <td>
          <Button variant="secondary" onClick={() => showdata(row._id)}>
            Edit
          </Button>{" "}
          ,
          <Button variant="danger" onClick={() => deleteUser(row._id)}>
            Delete
          </Button>{" "}
        </td>
      ),
    },
  ];

  function updateuser(id) {
    fetch(`http://localhost:5000/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ name: name, email: email, phone: number }),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((response) => {
        if (response.status == 200) {
          showdata();
          handleClose();
          showAlert();
          seteditdata([]);
        } else {
          handleClose();
          seteditdata([]);
        }
      });
  }
  function addUser(id) {
    fetch("http://localhost:5000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ name: name, email: email, phone: number }),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((response) => {
        if (response.status == 200) {
          showdata();
          handleClose();
          showAlert();
          seteditdata([]);
        } else {
          handleClose();
          seteditdata([]);
        }
      });
  }
  function deleteUser(id) {
    fetch(`http://localhost:5000/delete/${id}`, {
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
          showdata();
          handleClose();
          showAlert();
          seteditdata([]);
        } else {
          handleClose();
          seteditdata([]);
        }
      });
  }
  useEffect(() => {
    console.log(search);
    const searchData = userdata.filter((item) => {
      return item.name.match(search);
    });
    setfilterData(searchData);
  }, [search]);

  useEffect(() => {
    if (limitdata == 0 || limitdata == "") {
      setlimitdata(2);
      showdata();
    } else {
      showdata();
    }
  }, [limitdata]);
  const [filedata, setfile] = useState(null);
  function uploadfile() {
    console.log(filedata);
    fetch("http://localhost:5000/fileupload", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ file: filedata }),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
        } else {
        }
      });
  }
  return (
    <>
      {auth == true ? (
        <div className="content ">
          <Row>
            <Col lg="12">
              <Card className="table-container">
                <CardHeader className="d-flex justify-content-between">
                  <CardTitle tag="h4">User Data</CardTitle>
                  <Button onClick={handleShow} className="mx-4">Create User</Button>
                </CardHeader>

                {/* <CardBody>
                <Table responsive>

                  <DataTable 
                      columns={columns}
                      data={filterData}
                      pagination
                      selectableRows
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input type="search" placeholder="Search" className="w-25 form-control" onChange={(e) => setsearch(e.target.value)}
                        />
                      }
                      subHeaderAlign="right"
                    >

                  </DataTable>
                  
                </Table>
              </CardBody> */}

                <form
                  action="/uploadExcelFile"
                  enctype="multipart/form-data"
                  method="post"
                >
                  <input
                    type="file"
                    name="uploadfile"
                    hidden
                    accept="application/vnd.openxmlformats- 
                      officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => setfile(e.target.files[0])}
                  ></input>
                  <p className="btn" hidden onClick={uploadfile}>
                    submit
                  </p>
                  <hr></hr>
                </form>
                <div className="col-5 m-1">
                  Set Limit Data :{" "}
                  <input
                    type="text"
                    defaultValue={limitdata}
                    onChange={(e) => setlimitdata(e.target.value)}
                  />
                </div>
                <table className="m-3 text-center">
                  <thead className="text-primary ">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Number</th>
                      <th>Action</th>
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
                              <td>{value.phone}</td>
                              <td colSpan={2}>
                                <Button
                                  variant="secondary"
                                  onClick={() => showdata(value._id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => deleteUser(value._id)}
                                >
                                  Delete
                                </Button>
                              </td>
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

          <Modal show={show} onHide={handleClose}>
           
            <Modal.Header closeButton>
              <Modal.Title> User Data</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              {editdata.map((item) => (
                <div className="form-group mt-3" key={item._id}>
                  <label className="mt-1"> Name </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    defaultValue={item.name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <label className="mt-1"> Email </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email Address"
                    defaultValue={item.email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <label className="mt-1"> Mobile Number </label>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Mobile Number"
                    defaultValue={item.phone}
                    onChange={(e) => setnumber(e.target.value)}
                  />
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => updateuser(item._id)}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </div>
              ))}

              {editdata.length == 0 ? (
                <div className="form-group mt-3">
                  <label className="mt-1"> Name </label>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Name"
                    onChange={(e) => setname(e.target.value)}
                  />

                  <label className="mt-1"> Email </label>

                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Email Address"
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <label className="mt-1"> Mobile Number </label>

                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setnumber(e.target.value)}
                  />
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={addUser}>
                      Add User
                    </Button>
                  </Modal.Footer>
                </div>
              ) : (
                <h5></h5>
              )}
            </Modal.Body>
          </Modal>
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

export default Tables;
