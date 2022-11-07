const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../middleware/auth');

router.post('/addSubjectForSem', adminCtrl.addSubjectForSem);

// Social Login

module.exports = router;
