import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import BarChat from '../../../components/barchat/BarChat';
import SideNav from '../../../components/sidenavbar/SideNav';
import './SHome.css';
import axios from 'axios';
import { apilink } from '../../../data/fdata';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';
import { CircularProgress } from '@mui/material';

const SHome = () => {
  const tokon = Cookies.get('_tmsl_access_user_tokon_');
  const [userDet, setUserDet] = useState([]);
  const [profileUp, setProfileUp] = useState(false);
  const [graphShow, setGraphShow] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  const [barData, setBarData] = useState([]);

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
      setUserDet(res.data.userInfo);
      const ress = await axios.post(
        `${apilink}/api/student/getSubjectListInSem`,
        {
          dept: res.data.userInfo?.dept,
          batch: res.data.userInfo?.batch,
        },
        {
          headers: {
            Authorization: tokon,
          },
        }
      );
      // console.log(ress.data);
      if (ress.data.success) {
        setSubjectList(ress.data.subjectList);
        attendanceList(ress.data.subjectList.semester);
      } else {
        if (ress.data.msg == 'Invalid Authentication.') {
          Cookies.remove('_tmsl_access_user_tokon_');
          localStorage.removeItem('_tmsl_access_user_login');
          console.clear();
          window.location.href = `/student/login`;
        } else if (
          ress.data.msg == 'Update Your Profile (Batch and Department)'
        ) {
          setProfileUp(true);
        } else {
          alert.error(ress.data.msg);
        }
      }
    }
  }, []);

  const attendanceList = async (sem) => {
    setGraphShow(false);
    const res = await axios.get(
      `${apilink}/api/student/getAttendanceListGraph/${sem}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(res.data.attendanceList);
    if (res.data.success) {
      setBarData(res.data.attendanceList);
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
    setGraphShow(false);
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
                  <h5>
                    Name: <span className="fn-color">{userDet?.name}</span>
                  </h5>
                  <p>
                    Id: <span>{userDet?.studentId}</span>
                  </p>
                  {userDet?.dept && (
                    <p>
                      Dept: <span>{userDet?.dept}</span>
                    </p>
                  )}

                  {subjectList?.semester && (
                    <>
                      <p>
                        Sem: <span> {subjectList?.semester} Sem</span>
                      </p>
                    </>
                  )}

                  {userDet?.batch && (
                    <p>
                      Batch: <span>{userDet?.batch}</span>
                    </p>
                  )}

                  {subjectList?.subjects && (
                    <>
                      <p>Subjects:</p>
                      <ul className="pl-5">
                        {subjectList?.subjects?.map((val) => (
                          <li>{val}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {profileUp && (
                    <small className="fn_10 text-danger">
                      Update Your Profile (Batch and Department) to get Subject
                      Lists{' '}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-md-8  col-12 mx-auto mb-3">
                <div className="card p-3">
                  {graphShow ? (
                    <>
                      <div className="text-center p-2">No BarChat</div>
                    </>
                  ) : (
                    <>
                      <BarChat barData={barData} />
                    </>
                  )}
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
