import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const notifySuccess = () => toast.success("Activation email sent to your email address!");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Make API call to register user and send activation email
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/registers`, values);
      console.log("API Response:", response.data);

      // Show success toast and navigate to some info page or login
      notifySuccess();
    
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error.message);
      toast.error("There was an error registering. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-register text-dark register-height">
      <ToastContainer />
      <div className="container">
        <div className="card-box mt-5">
          <div className="row">
          <div
            className="col-lg-4 loginregisterimg"
            style={{
              backgroundImage: 'url("https://i.ibb.co/tLKzDL1/up1.jpg")',
              backgroundSize: "contain",
              height: "550px"
            }}
          />
            <div className="col-lg-8">
              <div className="form-align">
                <h3 className="display-5">Welcome to url Shorner!</h3>
                <hr className="my-4" />
                <p>
                  Get started by creating an account or{" "}
                  <Link to="/login">login here</Link> if you already have one.
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label>Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
