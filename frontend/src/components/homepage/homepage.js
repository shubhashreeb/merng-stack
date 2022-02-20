import React from 'react';
import './homepage.css'
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  let navigate = useNavigate();

  return (
    <div className="homepage">

  <h3>Welcome to our Home Page</h3>
  <p> This is the book exchange app developed in 2022.</p>
  </div>
  )};

export default Homepage;