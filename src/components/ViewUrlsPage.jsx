import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const ViewUrlsPage = () => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/url/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUrls(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching URLs:', err);
        }
      }
    };

    fetchUrls();
  }, [navigate]);

  return (
    <>
   
    <div className="container-fluid mt-5">
      <div className="row ">
      <div className="col-lg-3">
      <Sidebar />
      </div>
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h3 className="card-title text-center mb-4">Your URLs</h3>
            <ul className="list-group">
              {urls.map((url) => (
                <li key={url._id} className="list-group-item">
                  <p>Original URL: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
                  <p>Short URL: <a href={`${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{`${url.shortUrl}`}</a></p>
                  <p>Clicks: {url.clickCount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewUrlsPage;
