import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    borders: [{ type: String }],
    silhouette: { type: String, required: true }
});

const Country = mongoose.model("Country", CountrySchema);
export default Country;