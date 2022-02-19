import React from 'react';
import './homepage.css'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  let navigate = useNavigate();

  return (
    <div className="homepage">

  <h1>Welcome to our Home Page</h1>
  <p> This is the book exchange app developed in 2022.</p>
  
  {/* <div className="button">
  <button onClick={()=> { navigate("/homepage")}}/> 
  <div className="button" onClick={()=> { navigate("/homepage")}}>Logout</div> 

  </div> */}
  </div>
  )};

export default Homepage;