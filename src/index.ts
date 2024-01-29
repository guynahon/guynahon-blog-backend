import express from "express";
import PostRoutes from './routes/PostRoutes';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoute'
import cors from 'cors';

const app = express();
app.use(express.json());
const port = 5000;
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/post", PostRoutes);
app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);

app.listen(port, () => console.log(`app listeing on port ${port}`));