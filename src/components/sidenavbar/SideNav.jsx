import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
const headerNav = [
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
const SideNav = () => {
  const { pathname } = useLocation();
  const active = headerNav.findIndex((e) => e.path === pathname);
  return (
    <>
      <div className="side_navbar_inner">
        {headerNav?.map((val, i) => {
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
          {' '}
          <i className="fa fa-sign-out"></i> Logout
        </p>
      </div>
    </>
  );
};

export default SideNav;
