# URL Shortener Web Application

This project is a URL shortening web application built using React.js for the frontend and Node.js for the backend. The application includes features like authentication, registration, forgot password, email verification, URL shortening, and a dashboard for displaying URL statistics.



## Features

- User Authentication (Register, Login, Logout)
- Password Reset (Forgot Password, Reset Password)
- Email Verification
- URL Shortening
- Dashboard with URL Statistics
- Secure routes with JWT Authentication


## Technologies Used
Frontend: React.js, Chart.js, Axios
Backend: Node.js, Express.js, Mongoose, JWT
Database: MongoDB
Other: dotenv, cors



## installation

    1. Clone the repository:
        -  git clone https://github.com/AKASH021001-0202/urlshortner-frontend.git
        -  cd urlshortner-frontend

    2.  Install the dependencies:
        - npm install

    3. Create a .env file in the frontend directory and add the following environment variables:
        - env
        - VITE_BACKEND_URL=http://localhost:8000

    4.Start the frontend server:
        - npm run dev