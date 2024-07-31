import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activationStatus, setActivationStatus] = useState(null);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/activate/${token}`);
        toast.success(response.data.msg);
        setActivationStatus('success');
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("Activation failed. The token might be invalid or expired.");
        }
        setActivationStatus('failed');
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="container text-center mt-5">
      <ToastContainer />
      {loading ? (
        <p>Activating your account...</p>
      ) : activationStatus === 'success' ? (
        <div>
          <img
            src="https://example.com/success-image.png"  // Replace with your success image URL
            alt="Activation Success"
            style={{ width: "200px", height: "200px" }}
          />
          <h3>Account activated successfully!</h3>
          <p>Redirecting you to the login page...</p>
        </div>
      ) : activationStatus === 'failed' ? (
        <div>
          <img
            src="https://example.com/error-image.png"  // Replace with your error image URL
            alt="Activation Failed"
            style={{ width: "200px", height: "200px" }}
          />
          <h3>Activation failed</h3>
          <p>The activation token is invalid or has expired. Please try again.</p>
          <p>
            <a href="/register">Register Here</a> or <a href="/login">Login</a>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ActivateAccount;
