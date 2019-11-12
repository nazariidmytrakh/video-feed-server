const router = require('express').Router();

const videos = require('./videos');
const emails = require('./emails');

router.use('/videos', videos);
router.use('/emails', emails);

module.exports = router;
