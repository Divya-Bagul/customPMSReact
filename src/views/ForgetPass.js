import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import logo from "../assets/img/header.jpg";
import "../assets/css/App.css";
import Swal from "sweetalert2";

function ForgetPass(props) {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
 
  function SubmitEmail() {

    fetch('http://localhost:5000/mail', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usermail: email })
    })
      .then((Response) => {
        return Response.json();
      }).then((response) => {
        console.log(response);
        if(response.status == 200){
           Swal.fire({
            title: "Success",
            text: "Email sent successfully",
            icon: "success",
            confirmButtonText: "OK",
          })
        }else if(response.status == 500){
          Swal.fire({
            title: "Oops",
            text: response.data,
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      })
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title ">
            <center>

              Forget Password!!
            </center>
           
          </h3>
          <p className="text-center mt-2">
            Back to <Link to='/login'>Login ? </Link>
          </p>
          <div className="form-group mt-3">
            <label> Email address </label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <p className="btn btn-primary" onClick={(e) => SubmitEmail()} >
              Submit
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ForgetPass;