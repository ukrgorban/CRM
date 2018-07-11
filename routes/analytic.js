const express = require('express');
const controller = require('../controllers/analytic');
const router = express.Router();

router.get('/overview', controller.overview);
router.get('/analytic', controller.analytic);

module.exports = router;