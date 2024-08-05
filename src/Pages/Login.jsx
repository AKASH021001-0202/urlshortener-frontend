import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { userLogindata } from "../apis/auth";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const notify = () => toast.success("Login successful");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const loginResponse = await userLogindata(values);
  
      console.log('Login Response:', loginResponse); // Debugging output
  
      if (loginResponse.token) {
        dispatch(setUser(loginResponse)); // Assuming setUser correctly sets the user state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", loginResponse.token);
       
        resetForm();
        notify(); // Notify user of success
        navigate("/"); // Redirect to home or dashboard
      } else {
        // Handle unexpected response
        console.log('Unexpected response format:', loginResponse);
        setFieldError("email", "Invalid credentials");
        setFieldError("password", "Invalid credentials");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="card-box mt-5">
        <div className="row">
          <div
            className="col-lg-4 loginregisterimg"
            style={{
              backgroundImage: 'url("https://i.ibb.co/3kHmJ9C/sign2.jpg")',
              backgroundSize: "contain",
              height: "500px"
            }}
          />
          <div className="col-lg-8 d-flex align-items-center">
            <div className="form-align p-4">
              <h3 className="display-5">Welcome to Url Shortner!</h3>
              <hr className="my-4" />
              <p>Get started by creating an account or logging in if you already have one.</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field type="email" name="email" className="form-control" id="email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field type="password" name="password" className="form-control" id="password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </Form>
                )}
              </Formik>
              <p className="mt-3">
                Not registered yet? <Link to="/register">Register Here</Link>
              </p>
              <p>
                <Link to="/forgotpassword">Forgot Password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
