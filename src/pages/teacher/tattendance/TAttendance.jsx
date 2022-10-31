import React from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import SideNav from '../../../components/sidenavbar/SideNav';
import './TAttendance.css';
const TAttendance = () => {
  const alert = useAlert();
  const [classDate, setClassDate] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [dept, setDept] = useState('');

  const [loading, setLoading] = useState(false);

  const onFilter = (e) => {
    e.preventDefault();
    if (classDate.length == 0 && subjectCode.length == 0) {
      alert.error('Filter Value Missing');
    }
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
                      value={dept}
                      name="dept"
                      onChange={(e) => setDept(e.target.value)}
                    >
                      <option value="" hidden selected>
                        Dept
                      </option>
                      <option value="IT-A">IT-A</option>
                      <option value="IT-B">IT-B</option>
                    </select>
                    <select
                      class="inputbox"
                      value={subjectCode}
                      name="subjectCode"
                      onChange={(e) => setSubjectCode(e.target.value)}
                    >
                      <option value="" hidden selected>
                        SubjectCode
                      </option>
                      <option value="PEC-IT701C">PEC-IT701C</option>
                      <option value="PEC-IT702F">PEC-IT702F</option>
                      <option value="OEC-IT701A">OEC-IT701A</option>
                    </select>
                    <button type="submit" className="cur">
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-12 mx-auto mb-3">
                <div className="card p-3">
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th>SubjectCode</th>
                          <th>Department</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>John</td>
                          <td>Doe</td>
                          <td>john@example.com</td>
                        </tr>
                        <tr>
                          <td>Mary</td>
                          <td>Moe</td>
                          <td>mary@example.com</td>
                        </tr>
                        <tr>
                          <td>July</td>
                          <td>Dooley</td>
                          <td>july@example.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TAttendance;
