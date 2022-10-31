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

const App = () => {
  const [navstatus, setNavStatus] = useState(false);
  useEffect(() => {
    // console.log(window.location.pathname.split('/'));
    if (
      window.location.pathname.split('/').includes('teacher') ||
      window.location.pathname.split('/').includes('student') ||
      window.location.pathname.split('/').includes('admin')
    ) {
      console.log('ok');
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

        <Route component={Error} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
};

export default App;
