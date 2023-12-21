import "./FormLogin.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";


function FormLogin() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/app/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setIsLoggedIn(true);
      alert(response.data.msg);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

  return (
    <div className="container">
        <div className="login-container">
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <h1 className="title">Entre na sua conta</h1>
              <div className="login-form-group">
                <Field name="email" className="form-field" placeholder="Email" />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>
              {/* Input Senha */}
              <div className="form-group">
                <Field name="password" className="form-field" placeholder="Senha" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>
              <div className="button-container">
                <nav className="login-button">
                  <button className="button" type="submit">
                    Fazer Login
                  </button>
                </nav>
                <nav className="register-button">
                  <NavLink to="/register">Cadastre-se</NavLink>
                </nav>
              </div>
            </Form>
          </Formik>
        </div>
    </div >
  );
}

export default FormLogin;