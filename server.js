// YARN RUN SERVER

import express from "express"
import dotenv from 'dotenv'
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { connectToDb } from "./db/connectToDb.js";
import { protectRoute } from "./middlewares/protectRoute.js";
import cors from "cors"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.use("/api/auth", authRoutes);
app.use('/api/messages', protectRoute, messageRoutes);
app.use('/api/users', protectRoute, userRoutes);


app.get("/", (req, res) => {
    res.status(200).json({message: "Hi!!, Chat app server is running here"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectToDb();
});