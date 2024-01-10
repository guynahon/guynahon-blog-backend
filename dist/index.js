"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 5000;
app.use("/post", PostRoutes_1.default);
app.listen(port, () => console.log(`app listeing on port ${port}`));
