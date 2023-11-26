import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import logo from "../assets/img/header.jpg";
import "../assets/css/App.css";
import { defaults } from "chart.js";



function Login(props) {
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  function addData() {

    fetch('http://localhost:5000/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
      .then((Response) => {
        return Response.json();
      }).then((response) => {
        console.log(response);
        sessionStorage.setItem('token', response.token);
        if (response.token) {

          navigate('/admin/user');

        }

      })
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title ">
            <center>

              Login Here!!
            </center>

          </h3>

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
            <label> Password </label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <p className="btn btn-primary" onClick={(e) => addData()} >
              Login
            </p>
          </div>
          <p className="text-center mt-2">
            Forgot <Link to='/password'>password ? </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;