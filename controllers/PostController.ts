import { Request, Response } from "express";
import Post from '../models/Post'
import { PostServices } from "../services/PostServices";
import { FilterAndPage } from '../models/FilterAndPage'


export class PostController {
    private postServices: PostServices;

    constructor(postServices: PostServices) {
        this.postServices = postServices;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;
        const post = new Post(
            postData.title,
            postData.body,
            postData.subject,
            postData.date
        );
        try {
        await this.postServices.addPost(post)
        res.status(201).send('post created!')
        } catch(error) {
            res.status(404).send((error as Error).message)
        }
    }

    async getPosts (req: Request, res: Response): Promise<void> {
        const bodyData = req.body;
        const filterAndPageData: FilterAndPage = {
            from: parseInt(bodyData.from),
            to: parseInt(bodyData.to),
            filterBy: bodyData.filterBy
        }
        try {
            const postsList = await this.postServices.getPosts(filterAndPageData);
            res.status(200).send(postsList);
        } catch(error) {
            res.status(404).send((error as Error).message);
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        const postId = parseInt(req.params.id);
        try {
            const post = await this.postServices.getPost(postId);
            res.status(200).send(post)
        } catch(error) {
            res.status(404).send((error as Error).message)
        }
    }

    async editPost(req: Request, res: Response): Promise<void> {
        const postId = parseInt(req.params.id);
        const editDetails: Partial<Post> = req.body;
        try {
            await this.postServices.editPost(postId, editDetails);
            res.status(200).send('post edited');
        } catch (error) {
            res.status(404).send((error as Error).message);
        }
    }

    async removePost(req: Request, res: Response): Promise<void> {
        const postId = parseInt(req.params.id);
        try {
            await this.postServices.removePost(postId);
            res.status(200).send('post removed');
        } catch (error) {
            res.status(404).send((error as Error).message);
        }
    }
}