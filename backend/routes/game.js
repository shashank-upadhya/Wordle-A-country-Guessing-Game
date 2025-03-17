import express from "express";
import Country from "../models/countryScheme.js";
const router = express.Router();

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const getDirection = (lat1, lon1, lat2, lon2) => {
    const angle = Math.atan2(lon2 - lon1, lat2 - lat1) * (180 / Math.PI);
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((angle + 360) % 360) / 45) % 8;
    return directions[index];
};

let targetCountry = null;

router.post("/start", async (req, res) => {
    const countries = await Country.find();
    if (countries.length === 0) {
        return res.status(500).json({ error: "No countries found in database" });
    }

    targetCountry = countries[Math.floor(Math.random() * countries.length)];

    res.json({
        name: targetCountry.name,
        silhouette: targetCountry.silhouette
    });
});

router.post("/guess", async (req, res) => {
    if (!targetCountry) {
        return res.status(400).json({ error: "Game not started" });
    }

    const { guess } = req.body;
    if (!guess.trim()) {
        return res.status(400).json({ error: "Country guess is required" });
    }

    const guessedCountry = await Country.findOne({ name: { $regex: new RegExp(`^${guess}$`, "i") } });

    if (!guessedCountry) {
        return res.status(404).json({ error: "Country not found" });
    }

    const distance = getDistance(
        guessedCountry.latitude, guessedCountry.longitude,
        targetCountry.latitude, targetCountry.longitude
    );

    const direction = getDirection(
        guessedCountry.latitude, guessedCountry.longitude,
        targetCountry.latitude, targetCountry.longitude
    );

    res.json({
        guessed: guessedCountry.name,
        distance: Math.round(distance),
        direction,
        correct: distance === 0
    });
});

export default router;