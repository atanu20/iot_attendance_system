import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
const Home = () => {
  return (
    <>
      <div className="body_100">
        <div className="p-5">
          <NavLink to="/dashboard/student">Student</NavLink>
          <NavLink to="/dashboard/teacher" className="ml-5">
            Teacher
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
