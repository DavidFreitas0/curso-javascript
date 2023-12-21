import "./FormRegister.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function FormRegister() {

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/app/register", {
            name: values.name,
            email: values.email,
            password: values.password,
        }).then((response) => {
            alert(response.data.msg);
        });
    };

    const validationsRegister = yup.object().shape({
        name: yup
            .string()
            .required("O nome é obrigatório"),
        email: yup
            .string()
            .email("email inválido")
            .required("O email é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas são diferentes")
            .required("A confirmação da senha é obrigatória"),
    });
    return (
        <div className="register-container">
            <h1 className="title">Cadastro</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleRegister}
                validationSchema={validationsRegister}
            >
                <Form className="register-form">
                    <div className="register-form-group">
                        <Field name="name" className="form-field" placeholder="Nome" />

                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"
                        />
                    </div>

                    <div className="register-form-group">
                        <Field name="email" className="form-field" placeholder="Email" />

                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"
                        />
                    </div>

                    <div className="form-group">
                        <Field name="password" className="form-field" placeholder="Senha" />

                        <ErrorMessage
                            component="span"
                            name="password"
                            className="form-error"
                        />
                    </div>

                    <div className="form-group">
                        <Field
                            name="confirmation"
                            className="form-field"
                            placeholder="Confirme sua Senha"
                        />

                        <ErrorMessage
                            component="span"
                            name="confirmation"
                            className="form-error"
                        />
                    </div>
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default FormRegister;