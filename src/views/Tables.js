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
  Button,
} from "reactstrap";

function Tables() {
    const [userdata,setuserdata] = useState([]);
    const[responseData,setresponse] = useState('');
  useEffect(() => {
    showdata();
}, []);

function showdata(){

  fetch('http://localhost:5000/userdata', {
    method: "GET",
    headers: { 'Content-Type': 'application/json',
               'authorization':sessionStorage.getItem('token') },
  })
    .then((Response) => {
      return Response.json();
    }).then((response) => {
      console.log(response.status);
      if(response.status == 200){
      
        setuserdata(response.data);
      }else{
        setresponse(response.data);
      }

    })
}


  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">User Data</CardTitle>
                <Button>Create User</Button>
              </CardHeader>
              
              <CardBody>
                <Table responsive>
                <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      
                      
                    </tr>
                  </thead>
                  <tbody>
               { responseData == '' ? 
                (userdata.map(value => {
                      return(
                        <>

                          <tr key={value._id}>
                          <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            
                          </tr>
                        </>
                      )
                  })) : ( <h1> {responseData} </h1>)
                }
                </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
