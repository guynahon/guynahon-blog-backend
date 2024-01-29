import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { UserServices } from "../services/UserServices";
import { UserDataAccess } from "../data-access/UserDataAccess";


const router = express.Router();
const userController = new UserController(new UserServices(new UserDataAccess()));

router.post('/', async (req: Request, res: Response) => await userController.addUser(req, res));
// router.get('/', async (req: Request, res: Response) => await userController.getUsers(req, res));
router.get('/:id', async (req: Request, res: Response) => await userController.getUser(req, res));



export default router;