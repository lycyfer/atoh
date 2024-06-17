import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.router.js"
import clientRouter from "./routes/client.router.js"
const app = express()


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/client", clientRouter)

app.listen(8888, () => {
    console.log('Server is running on port 8888');
})