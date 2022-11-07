import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { apilink } from '../../../data/fdata';
import { useAlert } from 'react-alert';

const SAccountActive = () => {
  const { activetoken } = useParams();
  const alert = useAlert();

  const [loginStatus, setLoginStatus] = useState(false);

  const accountActivate = async () => {
    const res = await axios.post(`${apilink}/api/student/activation`, {
      activation_token: activetoken,
    });
    // console.log(res.data);

    if (res.data.success) {
      setLoginStatus(true);
    } else {
      alert.error(res.data.msg);
    }
  };

  return (
    <>
      <div className="center_100_flex">
        <div className="container">
          <br />
          <br />
          <div className="row mt-5">
            <div className="col-lg-6 col-md-8 col-12 mx-auto text-center">
              {loginStatus ? (
                <>
                  <img
                    src="https://raw.githubusercontent.com/atanu20/front-end-webdev/master/image/output-onlinegiftools.gif"
                    alt=""
                    width="120"
                    height="120"
                  />
                  <h4 className="text-success text-center">
                    Thank You!! Your Account has been activated
                  </h4>
                  <br />
                  <NavLink
                    className="btn  btn_vio_big text-light"
                    to="/student/login"
                  >
                    LogIn Now
                  </NavLink>
                </>
              ) : (
                <>
                  <h4 className="text-warning text-center">
                    Click Here to Activate Your account
                  </h4>
                  <button
                    className="btn btn_vio_big"
                    onClick={() => accountActivate()}
                  >
                    Click Here
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAccountActive;
