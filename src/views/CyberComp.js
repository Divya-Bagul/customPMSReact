import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import logo from "../assets/img/header.jpg";
import "../assets/css/App.css";
import { defaults } from "chart.js";

import Swal from "sweetalert2";

function CyberComp(props) {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [adhar_number, setadhar_numer] = useState("");

  const [complaint, setcomplaint] = useState("");

  function addData() {
    fetch("http://localhost:5000/addComplaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email,name:name,compliant_text:complaint,adhar_number:adhar_number }),
    })
    .then((Response) => {
        return Response.json();
    })
    .then((response) => {
      
        Swal.fire({
          title: "Oops",
          text: response.data,
          icon: "success",
          confirmButtonText: "OK",
        });
      
      });
  }
  return (
    <>
    <div className=" d-flex justify-content-end">
    <p className="text-end btn text-light mt-2 ">
    If you have account <Link to='/login'>Login ? </Link></p>
    </div>
    <div className="Auth-form-container_comp" >
     
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h5 className="Auth-form-title ">
            <center>Add Your Cyber Complaint Here!!</center>
            
          </h5>
          <div className="form-group mt-1">
            <label> Name </label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Name"
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label> Email address </label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label> Adhar card Number </label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="AdhaCard Number"
              onChange={(e) => setadhar_numer(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label> Add Compliant Detail </label>
            <textarea
             
              className="form-control mt-1"
              placeholder="add complaint"
              onChange={(e) => setcomplaint(e.target.value)}
            ></textarea>
          </div>
       
          <div className="d-grid gap-2 mt-3">
            <p className="btn btn-primary" onClick={(e) => addData()}>
                    Add Complaint 
            </p>
          </div>
         
        </div>
      </form>
    </div>
    </>
  );
}
export default CyberComp;
