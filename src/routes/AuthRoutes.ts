import express, { Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthServices } from "../services/AuthServices";
const router = express.Router();

const authController: AuthController = new AuthController(new AuthServices());



router.post("/", async (req: Request, res: Response) => await authController.handleGoogleUser(req, res));

export default router