import express from "express";
import PostRoutes from './routes/PostRoutes';

const app = express();
app.use(express.json());
const port = 5000;

app.use("/post", PostRoutes);

app.listen(port, () => console.log(`app listeing on port ${port}`));