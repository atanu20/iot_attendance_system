import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import SideNav from '../../../components/sidenavbar/SideNav';
import { apilink } from '../../../data/fdata';
import './SAttendance.css';
const SAttendance = () => {
  const alert = useAlert();
  const [classDate, setClassDate] = useState('');
  const [curSem, setCurSem] = useState('');
  const [subjectCod, setSubjectCod] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataloading, setDataLoading] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const tokon = Cookies.get('_tmsl_access_user_tokon_');

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
      // getAttendanceList();

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
      if (ress.data.success) {
        getAttendanceList();
        setSubjectList(ress.data.subjectList);
      } else {
        if (ress.data.msg == 'Invalid Authentication.') {
          Cookies.remove('_tmsl_access_user_tokon_');
          localStorage.removeItem('_tmsl_access_user_login');
          console.clear();
          window.location.href = `/student/login`;
        } else {
          alert.error(ress.data.msg);
        }
      }
    }
  }, []);

  const getAttendanceList = async () => {
    // setDataLoading(true);
    setLoading(true);
    const res = await axios.get(`${apilink}/api/student/getAttendanceList`, {
      headers: {
        Authorization: tokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setAttendanceList(res.data.attendanceLists);
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
    setTimeout(() => {
      // setDataLoading(false);
      setLoading(false);
    }, 3000);
  };

  const onFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (classDate.length == 0 && subjectCod.length == 0 && curSem == '') {
      alert.error('Filter Value Missing');
    } else {
      if (subjectCod.length > 0) {
        const res = await axios.get(
          `${apilink}/api/student/getAttendanceList`,
          {
            headers: {
              Authorization: tokon,
            },
          }
        );

        setAttendanceList(
          res.data.attendanceLists.filter((v) => v.subjectCode == subjectCod)
        );
      }
      if (curSem != '') {
        const res = await axios.get(
          `${apilink}/api/student/getAttendanceList`,
          {
            headers: {
              Authorization: tokon,
            },
          }
        );

        setAttendanceList(
          res.data.attendanceLists.filter((v) => v.currentSem == curSem)
        );
      }
      if (classDate.length > 0) {
        // const date1 = new Date('2022/11/07');
        // const date2 = new Date(classDate);
        // const diffTime = Math.abs(date2 - date1);
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // // console.log(diffTime + " milliseconds");
        // console.log(diffDays + ' days');

        const res = await axios.get(
          `${apilink}/api/student/getAttendanceList`,
          {
            headers: {
              Authorization: tokon,
            },
          }
        );
        // console.log(classDate);
        const arr = res.data.attendanceLists.filter((v) => {
          const day1 = new Date(v.presentDate).getDate();
          const mon1 = new Date(v.presentDate).getMonth() + 1;
          const year1 = new Date(v.presentDate).getFullYear();
          const datee1 = `${mon1}/${day1}/${year1}`;
          const date1 = new Date(datee1);

          const day2 = new Date(classDate).getDate();
          const mon2 = new Date(classDate).getMonth() + 1;
          const year2 = new Date(classDate).getFullYear();
          const datee2 = `${mon2}/${day2}/${year2}`;

          const date2 = new Date(datee2);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // console.log(datee1 + '____' + datee2);
          return diffDays == 0;
        });
        setAttendanceList(arr);
      }
    }

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
              <div className="col-12 mx-auto mb-3 search_filter">
                <form action="" onSubmit={onFilter}>
                  <div class="searchbox">
                    <input
                      type="text"
                      name="classDate"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => (e.target.type = 'text')}
                      placeholder="Enter ClassDate"
                      value={classDate}
                      onChange={(e) => setClassDate(e.target.value)}
                      class="inputbox inputone"
                    />

                    <select
                      class="inputbox inputone"
                      value={curSem}
                      name="curSem"
                      onChange={(e) => setCurSem(e.target.value)}
                    >
                      <option value="" hidden selected>
                        Current Sem
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
                        <option value={val}>{val}</option>
                      ))}
                    </select>

                    <select
                      class="inputbox"
                      value={subjectCod}
                      name="subjectCode"
                      onChange={(e) => setSubjectCod(e.target.value)}
                    >
                      <option value="" hidden selected>
                        SubjectCode
                      </option>
                      {subjectList?.subjects?.map((val) => (
                        <option value={val}>{val}</option>
                      ))}
                    </select>
                    <button type="submit" className="cur">
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-12 mt-1 mb-1">
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn_vio_sml text-light"
                    onClick={() => {
                      getAttendanceList();
                      setClassDate('');
                      setCurSem('');
                      setSubjectCod('');
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="col-12 mx-auto mb-3">
                <div className="card p-3 box_height">
                  {loading ? (
                    <>
                      <div className="text-center p-3">
                        <CircularProgress color="success" size={35} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="table-responsive">
                        <table class="table table-borderless">
                          <thead>
                            <tr>
                              <th>SubjectCode</th>
                              <th>Semester</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attendanceList?.length > 0 ? (
                              <>
                                {attendanceList?.map((val) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{val.subjectCode}</td>
                                        <td>{val.currentSem}</td>
                                        <td>
                                          {new Date(
                                            val.presentDate
                                          ).toLocaleDateString()}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                <div className="text-center p-2">
                                  <h5>No Data</h5>
                                </div>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAttendance;
