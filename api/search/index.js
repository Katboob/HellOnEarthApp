const fetch = require("node-fetch");

module.exports = async function (context, req) {
    const query = req.query.query || req.body.query;
    const lat = req.query.lat || req.body.lat;
    const lon = req.query.lon || req.body.lon;

    const AZURE_MAPS_KEY = process.env.AZURE_MAPS_KEY;

    if (!query || !lat || !lon) {
        context.res = { status: 400, body: "Missing parameters" };
        return;
    }

    const url = `https://atlas.microsoft.com/search/fuzzy/json?api-version=1.0&query=${encodeURIComponent(query)}&lat=${lat}&lon=${lon}&subscription-key=${AZURE_MAPS_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: data
    };
};
