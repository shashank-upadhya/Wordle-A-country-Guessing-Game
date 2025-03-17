import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config.js";
import countryRoutes from "./routes/countryRoutes.js"
import gameRoutes from "./routes/game.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/countries", countryRoutes);
app.use("/api/game", gameRoutes)

app.get('/', (request, response) => {
    return response.status(234).send("Hello Worldle Clone")
})

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error", err));

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));