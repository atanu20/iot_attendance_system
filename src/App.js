import React, { useEffect, useState } from 'react';

import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Error from './pages/Error';

import './App.css';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import SHome from './pages/student/shome/SHome';
import SAccount from './pages/student/saccount/SAccount';
import SAttendance from './pages/student/sattendance/SAttendance';
import TAccount from './pages/teacher/taccount/TAccount';
import TAttendance from './pages/teacher/tattendance/TAttendance';
import THome from './pages/teacher/thome/THome';
import Register from './pages/student/sauth/Register';
import Login from './pages/student/sauth/Login';
import TRegister from './pages/teacher/tauth/Register';
import TLogin from './pages/teacher/tauth/Login';

const App = () => {
  const [navstatus, setNavStatus] = useState(false);
  useEffect(() => {
    // console.log(window.location.pathname.split('/'));
    if (
      window.location.pathname.split('/').includes('teacher') ||
      window.location.pathname.split('/').includes('student') ||
      window.location.pathname.split('/').includes('admin')
    ) {
      // console.log('ok');
      setNavStatus(true);
    }
  }, []);
  return (
    <>
      {/* {navstatus ? (
        <>
          <NavBar />
        </>
      ) : (
        <>
          <h5>no nav</h5>
        </>
      )} */}

      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard/student" component={SHome} />
        <Route exact path="/student/attendance" component={SAttendance} />
        <Route exact path="/student/account" component={SAccount} />
        <Route exact path="/student/register" component={Register} />
        <Route exact path="/student/login" component={Login} />

        <Route exact path="/dashboard/teacher" component={THome} />
        <Route exact path="/teacher/account" component={TAccount} />
        <Route exact path="/teacher/attendance" component={TAttendance} />
        <Route exact path="/teacher/register" component={TRegister} />
        <Route exact path="/teacher/login" component={TLogin} />

        <Route component={Error} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
};

export default App;
