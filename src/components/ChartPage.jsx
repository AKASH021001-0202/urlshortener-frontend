import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartPage = () => {
  const [urlCount, setUrlCount] = useState({ daily: 0, monthly: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const requestUrl = `${import.meta.env.VITE_BACKEND_URL}/url/all/stats`;
        console.log(requestUrl);
        const response = await axios.get(requestUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUrlCount(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching URL stats:', err);
        }
      }
    };

    fetchData();
  }, [navigate]);

  const chartData = {
    labels: ['Daily', 'Monthly'],
    datasets: [
      {
        label: 'URL Count',
        data: [urlCount.daily, urlCount.monthly],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'URL Creation Statistics' },
    },
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
          <Sidebar />
          </div>
          <div className="col-lg-8">
          <h1>URL Statistics</h1>
          <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
     
      
    </div>
  );
};

export default ChartPage;
