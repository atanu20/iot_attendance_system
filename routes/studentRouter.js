const router = require('express').Router();
const studentCtrl = require('../controllers/studentCtrl');
const auth = require('../middleware/auth');

router.post('/register', studentCtrl.register);

router.post('/activation', studentCtrl.activateEmail);

router.post('/login', studentCtrl.login);

router.get('/infor', auth, studentCtrl.getUserInfor);

router.patch('/updateDetails', auth, studentCtrl.updateDetails);
router.patch('/updatePassword', auth, studentCtrl.updatePassword);
router.patch('/updateImage', auth, studentCtrl.updateImage);

router.post('/getSubjectListInSem', auth, studentCtrl.getSubjectListInSem);
router.get('/uploadPresent', studentCtrl.uploadPresent);
router.get(
  '/getAttendanceListGraph/:sem',
  auth,
  studentCtrl.getAttendanceListGraph
);
router.get('/getAttendanceList', auth, studentCtrl.getAttendanceList);
// Social Login

module.exports = router;
