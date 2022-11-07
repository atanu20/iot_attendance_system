import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apilink } from '../../../data/fdata';
import './Auth.css';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const his = useHistory();
  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.post(`${apilink}/api/student/login`, {
      email,
      password,
    });

    if (res.data.success) {
      Cookies.set('_tmsl_access_user_tokon_', res.data.access_token, {
        expires: 1,
      });
      localStorage.setItem('_tmsl_access_user_login', true);
      window.location.href = '/dashboard/student';
      // his.push('/dashboard/student');
    } else {
      setStatus(true);
      setMsg(res.data.msg);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="body_100_flex ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-10 col-12 mx-auto">
              <div className="card p-3">
                <h3 className="text-center">Student Login</h3>
                <br />
                {status ? (
                  <>
                    <div class="alert alert-warning alert-dismissible">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      {msg}
                    </div>
                  </>
                ) : null}

                <form action="" onSubmit={onSub}>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Enter Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <span
                      className="cur fn_12"
                      onClick={() => his.push('/student/register')}
                    >
                      Create Your Account
                    </span>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className={
                        loading ? 'dis btn  btn_vio_big ' : 'btn  btn_vio_big '
                      }
                      disabled={loading}
                    >
                      Login
                    </button>
                  </div>
                  {loading && (
                    <div className="text-center p-2">
                      <CircularProgress color="success" size={35} />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
