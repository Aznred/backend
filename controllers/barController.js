const axios = require("axios");

const GOOGLE_API_KEY = "AIzaSyBjAsC5XT2ZRHXKmwmRwq8YUWMPKO1fRt4";
const pragueCoords = "50.0874654,14.4212535";
const radius = 30000;

const BAD_TYPES = [
    "lodging", "hotel", "restaurant", "point_of_interest", "establishment"
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

exports.googleBars = async (req, res) => {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pragueCoords}&radius=${radius}&type=bar&key=${GOOGLE_API_KEY}`;
    let allResults = [];
    let nextPageToken = null;
    let page = 0;
    try {
        do {
            const { data } = await axios.get(url);
            if (Array.isArray(data.results)) {
                allResults = allResults.concat(data.results);
            }
            nextPageToken = data.next_page_token;
            page++;
            if (nextPageToken && page < 3) { // 3 pages max
                await sleep(2200);
                url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${GOOGLE_API_KEY}`;
            } else {
                nextPageToken = null;
            }
        } while (nextPageToken);

        const bars = allResults
            .filter(item =>
                item.types &&
                item.types.includes("bar") &&
                !item.types.some(t => BAD_TYPES.includes(t) && t !== "bar")
            )
            .map((item, i) => ({
                id: item.place_id,
                name: item.name,
                address: item.vicinity || "",
                location: "Prague",
                rating: item.rating || 0,
                reviewCount: item.user_ratings_total || 0,
                image: item.photos
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                    : "https://images.unsplash.com/photo-1464983953574-0892a716854b",
                tags: item.types?.filter(t =>
                    t !== "bar" && !BAD_TYPES.includes(t)
                ) || [],
                alcohols: ["Beer", "Wine", "Cocktails", "Liquors"].filter(() => Math.random() > 0.4),
                price: ["$", "$$", "$$$"][Math.floor(Math.random() * 3)],
                description: item.name + " à Prague.",
            }));

        res.json(bars);
    } catch (e) {
        console.error("Google Places API error:", e);
        res.status(500).json({ error: "Google Places API error", details: e.toString() });
    }
};

exports.googleBarDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,reviews,user_ratings_total,formatted_address,photos,geometry,types,website,formatted_phone_number,reviews&key=${GOOGLE_API_KEY}`;
        const { data } = await axios.get(url);
        if (!data.result) return res.status(404).json({ error: "Bar introuvable (Google Details)" });
        res.json(data.result);
    } catch (e) {
        res.status(500).json({ error: "Google Place Details API error", details: e.toString() });
    }
};
