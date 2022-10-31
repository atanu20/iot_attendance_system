import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
const studentNav = [
  {
    display: 'Dashboard',
    path: '/dashboard/student',
  },
  {
    display: 'Attendance',
    path: '/student/attendance',
  },
  {
    display: 'Account',
    path: '/student/account',
  },
];

const teacherNav = [
  {
    display: 'Dashboard',
    path: '/dashboard/teacher',
  },
  {
    display: 'Attendance',
    path: '/teacher/attendance',
  },
  {
    display: 'Account',
    path: '/teacher/account',
  },
];

const SideNav = () => {
  const { pathname } = useLocation();
  const active = studentNav.findIndex((e) => e.path === pathname);

  if (window.location.pathname.split('/').includes('teacher')) {
    const tactive = teacherNav.findIndex((e) => e.path === pathname);
    return (
      <>
        <div className="side_navbar_inner">
          {teacherNav?.map((val, i) => {
            return (
              <>
                <NavLink
                  key={i}
                  to={val.path}
                  className={`${i === tactive} ?'active':''`}
                >
                  {val.display}
                </NavLink>
              </>
            );
          })}
        </div>
        <div className="side_navbar_bottom">
          <p>
            <i className="fa fa-sign-out"></i> Logout
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="side_navbar_inner">
        {studentNav?.map((val, i) => {
          return (
            <>
              <NavLink
                key={i}
                to={val.path}
                className={`${i === active} ?'active':''`}
              >
                {val.display}
              </NavLink>
            </>
          );
        })}
      </div>
      <div className="side_navbar_bottom">
        <p>
          <i className="fa fa-sign-out"></i> Logout
        </p>
      </div>
    </>
  );
};

export default SideNav;
