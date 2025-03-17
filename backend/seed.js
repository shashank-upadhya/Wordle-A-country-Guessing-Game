import mongoose from "mongoose";
import config from "./config.js";
import Country from "./models/countryScheme.js";
import axios from 'axios';

const getSilhouetteURL = (code) => {
    return `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code.toLowerCase()}/vector.svg`;
};

const updateCountriesWithSilhouettes = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map(country => {
            const latlng = country.latlng && country.latlng.length === 2 ? country.latlng : [0, 0];
            return {
                name: country.name.common,
                code: country.cca2,
                latitude: latlng[0],
                longitude: latlng[1],
                silhouette: getSilhouetteURL(country.cca2)
            };
        });

        mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(async () => {
                await Country.deleteMany();
                await Country.insertMany(countries);
                console.log("Database seeded with country silhouettes");
                mongoose.connection.close();
            })
            .catch(err => console.error("MongoDB Error during seeding:", err));

    } catch (error) {
        console.error("Error fetching country data from API:", error);
    }
};

updateCountriesWithSilhouettes();