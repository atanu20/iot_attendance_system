import { CircularProgress } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BarChat from '../../../components/barchat/BarChat';
import SideNav from '../../../components/sidenavbar/SideNav';
// import './SHome.css';

const THome = () => {
  const [showstatus, setShowStatus] = useState(false);
  const [SubCode, setSubCode] = useState('');
  const [SubName, setSubName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');

  const onSubjectAdd = (e) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
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
              <div className="col-12 mx-auto mb-3">
                <div className="card p-3">
                  <h5>
                    Name: <span className="fn-color">Ami Teacher</span>
                  </h5>
                  <p>
                    Id: <span>13000219033</span>
                  </p>

                  <p>Subjects:</p>
                  <ul className="pl-5">
                    <li>
                      PEC-IT701C (Subject Name){' '}
                      <i className="fa fa-trash fn-color cur ml-3"></i>{' '}
                    </li>
                    <li>PEC-IT702F </li>
                    <li>OEC-IT701A</li>
                    <li>HSMC701</li>
                    <li>PROJ-IT781</li>
                  </ul>
                  <div className="text-right">
                    <i
                      className="fa fa-plus-square-o fn-color cur mr-2"
                      onClick={() => setShowStatus(true)}
                    ></i>
                  </div>
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
            <h5 className="fn-color">Add Subject Details</h5>
            <hr />

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
            <form action="" onSubmit={onSubjectAdd}>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="subjectcode"
                  placeholder="Enter Subject Code"
                  required
                  value={SubCode}
                  onChange={(e) => setSubCode(e.target.value)}
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="subjectname"
                  placeholder="Enter Subject Name"
                  required
                  value={SubName}
                  onChange={(e) => setSubName(e.target.value)}
                />
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
                  Add Subject
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
      )}
    </>
  );
};

export default THome;
