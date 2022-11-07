import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SideNav from '../../../components/sidenavbar/SideNav';
import { apilink } from '../../../data/fdata';
import './SAccount.css';
import { useAlert } from 'react-alert';

const SAccount = () => {
  const tokon = Cookies.get('_tmsl_access_user_tokon_');
  const [userDet, setUserDet] = useState([]);

  const [imgloading, setImgLoading] = useState(false);
  const [postimg, setPostimg] = useState([]);
  const [showstatus, setShowStatus] = useState(false);
  const [npassword, setNPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [pstatus, setPStatus] = useState(false);
  const [pmsg, setPMsg] = useState('');
  const [ploading, setPLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState('');

  const his = useHistory();
  const alert = useAlert();
  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: tokon,
      },
    });
    if (!res.data.success) {
      Cookies.remove('_tmsl_access_user_tokon_');
      localStorage.removeItem('_tmsl_access_user_login');
      console.clear();
      window.location.href = `/student/login`;
    } else {
      setEmail(res.data.userInfo.email);
      setBatch(res.data.userInfo.batch);
      setDept(res.data.userInfo.dept);
      setPhone(res.data.userInfo.phone);
      setUserDet(res.data.userInfo);
    }
  }, []);

  const handelImg = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/jpg' ||
        files[0].type === 'image/png'
      ) {
        if (files[0].size > 1024 * 1024) {
          alert.error('File Size is Too Large');
        } else {
          setPostimg(files[0]);

          setImgLoading(true);
          let formData = new FormData();
          formData.append('file', files[0]);
          // console.log(files);

          const res = await axios.patch(
            `${apilink}/api/student/updateImage`,
            formData,
            {
              headers: {
                Authorization: tokon,
              },
            }
          );
          if (res.data.success) {
            getmyinfo();
          } else {
            if (res.data.msg == 'Invalid Authentication.') {
              Cookies.remove('_tmsl_access_user_tokon_');
              localStorage.removeItem('_tmsl_access_user_login');
              console.clear();
              window.location.href = `/student/login`;
            } else {
              alert.error(res.data.msg);
            }
          }

          setImgLoading(false);
        }
      } else {
        alert.error('Only PNG, JPEG, JPG');
      }
    }
  };

  const onUpdatePassword = async (e) => {
    e.preventDefault();
    setPLoading(true);
    if (npassword.length < 7) {
      setPStatus(true);
      setPMsg('Password should be more than 6 characters');
    } else if (npassword !== cpassword) {
      setPStatus(true);
      setPMsg('Both Password not matched');
    } else {
      const res = await axios.patch(
        `${apilink}/api/student/updatePassword`,
        {
          npassword,
        },
        {
          headers: {
            Authorization: tokon,
          },
        }
      );
      if (res.data.success) {
        Cookies.remove('_tmsl_access_user_tokon_');
        localStorage.removeItem('_tmsl_access_user_login');
        console.clear();
        window.location.href = `/student/login`;
      } else {
        alert.error('res.data.msg');
      }
    }
    setPLoading(false);
  };

  const onUpdateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (batch.split('-').length != 2 || batch.length != 9) {
      setStatus(true);
      setMsg('Batch Year should be like this yyyy-yyyy');
    } else if (batch.split('-')[0] >= batch.split('-')[1]) {
      setStatus(true);
      setMsg('First year < Final Year');
    } else {
      const res = await axios.patch(
        `${apilink}/api/student/updateDetails`,
        {
          batch,
          phone,
          dept,
        },
        {
          headers: {
            Authorization: tokon,
          },
        }
      );
      if (res.data.success) {
        getmyinfo();
      } else {
        if (res.data.msg == 'Invalid Authentication.') {
          Cookies.remove('_tmsl_access_user_tokon_');
          localStorage.removeItem('_tmsl_access_user_login');
          console.clear();
          window.location.href = `/student/login`;
        } else {
          alert.error(res.data.msg);
        }
      }
    }

    setLoading(false);
  };

  const getmyinfo = async () => {
    const res = await axios.get(
      `${apilink}/api/student/infor`,

      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setEmail(res.data.userInfo.email);
      setBatch(res.data.userInfo.batch);
      setDept(res.data.userInfo.dept);
      setPhone(res.data.userInfo.phone);
      setUserDet(res.data.userInfo);
      setStatus(true);
      setMsg('Update Successfully');
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_tmsl_access_user_tokon_');
        localStorage.removeItem('_tmsl_access_user_login');
        console.clear();
        window.location.href = `/student/login`;
      } else {
        alert.error(res.data.msg);
      }
    }
  };

  return (
    <>
      <div className="both_home">
        <div className="side_navbar">
          <SideNav />
        </div>
        <div className="main_div">
          <div className="main_inner_div">
            <div className="row">
              <div className="col-md-4  col-12 mx-auto mb-3">
                <div className="card p-3">
                  <div>
                    <div className="">
                      <div>
                        {imgloading ? (
                          <div className="text-center p-2">
                            <CircularProgress color="success" size={35} />
                          </div>
                        ) : (
                          <>
                            <img
                              src={
                                userDet?.profileimg
                                  ? userDet?.profileimg
                                  : 'https://res.cloudinary.com/du9emrtpi/image/upload/v1660128327/avatar/user_beo1wf.png'
                              }
                              alt="logo"
                              className="userimg d-block mx-auto"
                            />
                          </>
                        )}
                      </div>
                      <div className="text-center mt-2">
                        <label htmlFor="file">
                          <p className="textb">Upload Photo</p>
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            id="file"
                            onChange={handelImg}
                            accept=".png,.jpeg,.jpg"
                          />
                        </label>
                        <div class="alert alert-warning m-3 fn_12">
                          Upload New Photo. Maximum upload size
                          <strong> 2 MB</strong>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h5 className="m-0">{userDet?.name}</h5>
                      <span className="fn_12">
                        Member Since:{' '}
                        {new Date(userDet?.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8  col-12 mx-auto mb-3">
                <div className="card p-3">
                  <div className="text-right">
                    <button
                      className="btn btn_vio_big fn_12"
                      onClick={() => setShowStatus(true)}
                    >
                      Update Password
                    </button>
                  </div>
                  <hr />
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

                  <form action="" onSubmit={onUpdateAccount}>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        placeholder="Enter Email"
                        required
                        readOnly
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <input
                        type="number"
                        class="form-control"
                        name="phone"
                        placeholder="Enter Phone No."
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name="batch"
                        placeholder="Enter Batch (2019-2023)"
                        required
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <select
                        class="form-control"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        required
                      >
                        <option selected hidden value="">
                          --Choose Department--
                        </option>
                        <option value="IT-A">IT-A</option>
                        <option value="IT-B">IT-B</option>
                      </select>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className={
                          loading
                            ? 'dis btn  btn_vio_big fn_12'
                            : 'btn  btn_vio_big fn_12'
                        }
                        disabled={loading}
                      >
                        Update Details
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
      </div>
      {showstatus && (
        <div className="modbox">
          <div className="bigbox">
            <div className="btn_close" onClick={() => setShowStatus(false)}>
              X
            </div>
            <h5 className="fn-color">Update Password</h5>
            <br />
            {pstatus ? (
              <>
                <div class="alert alert-warning alert-dismissible">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    onClick={() => setPStatus(false)}
                  >
                    &times;
                  </button>
                  {pmsg}
                </div>
              </>
            ) : null}
            <form action="" onSubmit={onUpdatePassword}>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="npassword"
                  placeholder="Enter New Password"
                  required
                  value={npassword}
                  onChange={(e) => setNPassword(e.target.value)}
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="cpassword"
                  placeholder="Confirm New Password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={
                    ploading
                      ? 'dis btn  btn_vio_big fn_12'
                      : 'btn  btn_vio_big fn_12'
                  }
                  disabled={ploading}
                >
                  Update Password
                </button>
              </div>
              {ploading && (
                <div className="text-center p-2">
                  <CircularProgress color="success" size={35} />
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SAccount;
