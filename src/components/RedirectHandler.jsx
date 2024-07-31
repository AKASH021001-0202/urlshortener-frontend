import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectHandler = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage

      try {
        console.log("Fetching original URL for short ID:", shortId);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/url/${shortId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("Fetched original URL:", res.data.originalUrl);

        // Validate the URL before redirecting
        if (res.data.originalUrl) {
          window.location.href = res.data.originalUrl; // Manually handle redirection
        } else {
          console.error("Original URL is not available.");
          alert("Original URL not found.");
          navigate('/'); // Redirect to a fallback page if URL is not available
        }
      } catch (err) {
        console.error("Error fetching original URL:", err);
        alert("Error fetching original URL");
        navigate('/'); // Redirect to a fallback page on error
      }
    };

    fetchOriginalUrl();
  }, [shortId, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
