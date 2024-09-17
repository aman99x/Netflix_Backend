import dotenv from "dotenv";
import express from "express";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js "
import cors from "cors";

const app = express();
dotenv.config({path: ".env"});

// Connect to the database
databaseConnection();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:3000", "https://netflix-clone-three-beta.vercel.app"],
    credentials:true
}
app.use(cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use("/api/v1/user", userRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
