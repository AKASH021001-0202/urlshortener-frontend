import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Redirecting to login.');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/url/shorten`,
        { longUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShortUrl(res.data.shortUrl);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.error('Unauthorized request. Redirecting to login.');
        localStorage.removeItem('token'); // Clear the token from local storage
        localStorage.removeItem('isAuthenticated'); // Clear isAuthenticated from local storage
        navigate('/login');
      } else {
        console.error('Error shortening URL:', err);
      }
    }
  };

  return (
    <>
    <Header />
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h3 className="card-title text-center mb-4">URL Shortener</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="longUrl" className="form-label">Long URL</label>
                <input
                  type="text"
                  id="longUrl"
                  className="form-control"
                  placeholder="Enter your long URL here"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Shorten</button>
              {shortUrl && (
                <div className="alert alert-success mt-3" role="alert">
                  Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
    
</>
  );
};

export default Home;
