import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BarChat from '../../../components/barchat/BarChat';
import SideNav from '../../../components/sidenavbar/SideNav';
import './SHome.css';

const SHome = () => {
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
                  <h5>
                    Name: <span className="fn-color">Atanu Jana</span>
                  </h5>
                  <p>
                    Id: <span>13000219033</span>
                  </p>
                  <p>
                    Dept: <span>ITA</span>
                  </p>
                  <p>
                    Sem: <span>7 Sem</span>
                  </p>
                  <p>
                    Batch: <span>2019-2023</span>
                  </p>
                  <p>Subjects:</p>
                  <ul className="pl-5">
                    <li>PEC-IT701C</li>
                    <li>PEC-IT702F</li>
                    <li>OEC-IT701A</li>
                    <li>HSMC701</li>
                    <li>PROJ-IT781</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8  col-12 mx-auto mb-3">
                <div className="card p-3">
                  <BarChat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {showstatus && (
        <div className="modbox">
          <div className="bigbox">
            <div className="btn_close" onClick={() => setShowstatus(false)}>
              X
            </div>
            <h5 className="fn-color">Update Semester Details</h5>
          </div>
        </div>
      )} */}
    </>
  );
};

export default SHome;
