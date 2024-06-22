
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "Url is Required"})
    const shortID = shortid();
        
    try {
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: []
        });

        return res.json({ id: shortID });
    } catch (error) {
        console.error('Error generating short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetID (req, res)  {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    }
                },
            }
        );
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error redirecting:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {handleGenerateShortUrl, handleGetAnalytics, handleGetID};