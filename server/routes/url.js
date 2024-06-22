const express = require("express");
const{handleGenerateShortUrl, handleGetAnalytics, handleGetID} = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateShortUrl);

router.get('/:shortId', handleGetID);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;