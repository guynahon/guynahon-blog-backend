import express, { Request, Response } from "express";
import {PostController} from "../controllers/PostController";
import { PostServices } from "../services/PostServices";
import { PostDataAccessSQL } from "../data-access/PostDataAccessSQL";
import { jwtUserVerifier, jwtAdminVerifier } from "../middlewares/jwtVerifier";

const router = express.Router();
const postController = new PostController(new PostServices(new PostDataAccessSQL()));

router.post('/',jwtAdminVerifier, async (req: Request, res: Response) => await postController.addPost(req,res));
router.get('/', async (req: Request, res: Response) => await postController.getPosts(req, res));
router.delete('/clear', jwtAdminVerifier, async (req: Request, res: Response) => await postController.clearPosts(req,res));
router.get('/profile', jwtUserVerifier, async (req: Request, res: Response) => await postController.getPostsByUserId(req,res));
router.get('/:id', async (req: Request, res: Response) => await postController.getPost(req,res));
router.put('/:id', jwtAdminVerifier, async (req: Request, res: Response) => await postController.editPost(req,res));
router.delete('/:id', jwtAdminVerifier, async (req: Request, res: Response) => await postController.removePost(req,res));

export default router