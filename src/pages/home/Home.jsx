import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
const Home = () => {
  return (
    <>
      <div className="body_100_flex">
        <div className="p-2">
          <h2>Techno Main Salt Lake (IT)</h2>
          <div className="mt-3">
            <NavLink
              to="/student/login"
              className=" m-1 btn btn_vio_big text-light"
            >
              Login As a Student
            </NavLink>
            <NavLink
              to="/teacher/login"
              className=" m-1 btn btn_vio_big text-light"
            >
              Login As a Teacher
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
