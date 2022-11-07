import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { apilink } from '../../data/fdata';
import './Home.css';
const Home = () => {
  const tokon = Cookies.get('_tmsl_access_user_tokon_');
  const [userDet, setUserDet] = useState([]);
  const his = useHistory();
  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: tokon,
      },
    });
    if (!res.data.success) {
    } else {
      setUserDet(res.data.userInfo);
    }
  }, []);

  return (
    <>
      <div className="body_100_flex">
        <div className="p-2">
          <h2>Techno Main Salt Lake (IT)</h2>
          {userDet?.name ? (
            <>
              <h5>
                Welcome <span className="fn-color">{userDet?.name}</span>{' '}
              </h5>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
