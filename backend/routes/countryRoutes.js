import express from "express";
import Country from "../models/countryScheme.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const countries = await Country.find();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/:name", async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.params.name });
        if (!country) return res.status(404).json({ error: "Country not found" });
        res.json(country);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
