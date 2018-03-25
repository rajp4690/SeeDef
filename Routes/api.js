/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

// Controller Imports
const apiHome = require('../Controller/apiHome');
const auth = require('../Controller/auth');
// const sellerModification = require('../Controller/sellerModification');

router.post('/auth/getWords', auth.extractWords);
router.post('/auth/getDef', auth.getDefinition);

// API
// Base API Route
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

// 404 paths
router.use(apiHome.invalidPath);

// Return Router
module.exports = router;
