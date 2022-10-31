import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import './NavBar.css';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="whole_box">
        <div className="navbar_box">
          <div className="dflex">
            <MenuIcon
              className="cur mr-2 menu_bar "
              style={{ marginTop: '-6px' }}
              onClick={() => setOpen(true)}
            />
            <NavLink to="/">
              <h3>
                TMSL<span>IT</span>
              </h3>
            </NavLink>
          </div>
          <div className="right_navbar">
            <div className="right_bell">
              <div>0</div>
              <i className="fa fa-bell "></i>
            </div>
            <div className="right_navbar_inner">
              <img src="../image/logo.jpeg" alt="" className="nav_user_img" />
              <div className="ml-1">
                <p className="fn_12">Atanu Jana</p>
                <span className="fn_10">130002190333</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Toolbar className="nav-wid">
          <NavLink to="/" onClick={() => setOpen(false)}>
            <h3 className="m-0">
              TMSL<span className="text-dark">IT</span>
            </h3>
          </NavLink>
        </Toolbar>

        {/* <Divider /> */}
        <List disablePadding className="listsize">
          <ListItem
            button
            component={Link}
            to="/dashboard/student"
            onClick={() => setOpen(false)}
          >
            <div className="pr-3">
              <i className="fa fa-tachometer"></i>
            </div>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/student/attendance"
            onClick={() => setOpen(false)}
          >
            <div className="pr-3">
              <i className="fa fa-list-alt"></i>
            </div>
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/student/account"
            onClick={() => setOpen(false)}
          >
            <div className="pr-3">
              <i className="fa fa-user-o"></i>
            </div>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
        <div className="side_navbar_bottom">
          <p>
            {' '}
            <i className="fa fa-sign-out"></i> Logout
          </p>
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
