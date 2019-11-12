const router = require('express').Router();

const emailController = require('../controllers/emailController');

router.post('/', emailController.postEmail);

module.exports = router;
