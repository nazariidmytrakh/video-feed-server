const router = require('express').Router();

const videoController = require('../controllers/videoController');

router.get('/', videoController.getVideoList);

module.exports = router;
