import { Request, Response } from "express";
import Post from '../models/Post'
import { PostServices } from "../services/PostServices";
import { SubjectAndFilterAndPage, IdAndFilterAndPage } from '../models/TypeSubjectAndFilterAndPage'


export class PostController {
    private postServices: PostServices;

    constructor(postServices: PostServices) {
        this.postServices = postServices;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;
        
        const post = new Post(
            null,
            postData.title,
            postData.body,
            postData.subject,
            postData.date,
            postData.image_url,
            postData.posted_by
        );

        try {
            await this.postServices.addPost(post);
            res.status(201).send('post created!');
            
        } catch(error) {
            res.status(404).send((error as Error).message)
        }
    }

    async getPosts (req: Request, res: Response): Promise<void> {

        const subjectAndFilterAndPageData: SubjectAndFilterAndPage = {
            subject: req.query.subject as string,
            from: req.query.from as number | undefined,
            to: req.query.to as number | undefined,
            filterBy: req.query.filterBy as string | undefined
        }

        try {
            const postsList = await this.postServices.getPosts(subjectAndFilterAndPageData);
            res.status(200).send(postsList);
        } catch(error) {
            res.status(404).send((error as Error).message);
        }
    }

    async clearPosts(req: Request, res: Response): Promise<void> {
        try {
            await this.postServices.clearPosts();
            res.status(200).send("cleared all posts");
        } catch(error) {
            res.status(404).send("failed clearing all posts")
        }
    }


    async getPostsByUserId(req: Request, res: Response): Promise<void> {
        const idAndFilterAndPageData: IdAndFilterAndPage = {
            id: req.query.id as string,
            from: req.query.from as number | undefined,
            to: req.query.to as number | undefined,
            filterBy: req.query.filterBy as string | undefined
        }

        try {
            const postsList = await this.postServices.getPostsByUserId(idAndFilterAndPageData);
            res.status(200).send(postsList);
        } catch(error) {
            res.status(404).send((error as Error).message);
        }

    }

    async getPostsByUserLastName(req: Request, res: Response): Promise<void> {
        try {
            const lastName = req.query?.lastName?.toString();
            if (!lastName) {
                throw new Error("parameter undefined")
            }
            const postsList = await this.postServices.getPostsByUserLastName(lastName);
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