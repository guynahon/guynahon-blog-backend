import express, { Request, Response } from "express";
import {PostController} from "../controllers/PostController";
import { PostServices } from "../services/PostServices";
import { PostDataAccessSQL } from "../data-access/PostDataAccessSQL";

const router = express.Router();
const postController = new PostController(new PostServices(new PostDataAccessSQL()));

router.post('/', async (req: Request, res: Response) => await postController.addPost(req,res));
router.get('/', async (req: Request, res: Response) => await postController.getPosts(req, res));
router.get('/:id', async (req: Request, res: Response) => await postController.getPost(req,res));
router.put('/:id', async (req: Request, res: Response) => await postController.editPost(req,res));
router.delete('/:id', async (req: Request, res: Response) => await postController.removePost(req,res));

export default router