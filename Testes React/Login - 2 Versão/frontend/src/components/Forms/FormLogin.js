import "./FormLogin.css";
import * as yup from "yup";
import { ErrorMessage } from "formik";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";


function FormLogin() {

  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/app/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  return (
    <div className="container">
      <div className="login-container">
        <form method="get">
          <div className="login-form">
            <h1 className="title">Entre na sua conta</h1>
            <div className="login-form-group">
              <input type="email" name="email" className="form-field" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" name="password" className="form-field" placeholder="Senha" />
            </div>
            <div className="button-container">
              <div className="login-button">
                <button className="button" type="submit" onChange={handleLogin}>
                  Fazer Login
                </button>
              </div>
              <div className="register-button">
                <NavLink to="/register">Cadastre-se</NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
}

export default FormLogin;