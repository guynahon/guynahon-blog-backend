import express from "express";
import PostRoutes from './routes/PostRoutes';
import OAuthRoutes from './routes/RequestAuthRoutes';
import RequestAuthRoutes from './routes/RequestAuthRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
const port = 5000;
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/post", PostRoutes);
app.use('/request', RequestAuthRoutes);
app.use("/oauth", OAuthRoutes);

app.listen(port, () => console.log(`app listeing on port ${port}`));