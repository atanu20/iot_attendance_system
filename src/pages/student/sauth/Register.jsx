import { CircularProgress } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apilink } from '../../../data/fdata';
import './Auth.css';
import axios from 'axios';
const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const his = useHistory();
  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.post(`${apilink}/api/student/register`, {
      email,
      name,
      id,
      password,
    });
    // console.log(res.data);
    if (res.data.success) {
      setStatus(true);
      setMsg(res.data.msg);
      setEmail('');
      setId('');
      setPassword('');
      setName('');
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
                <h3 className="text-center">Student Register</h3>
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
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="Enter Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="id"
                      placeholder="Enter Collage Id"
                      required
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
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
                      style={{ marginTop: '-15px' }}
                      onClick={() => his.push('/student/login')}
                    >
                      Already Have an Account ?
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
                      Register
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

export default Register;
