import Post from "../models/Post";
import { IPostDataAccess } from "./IPostDataAccess";
import { FilterAndPage } from "../models/TypeFilterAndPage";
import { Client } from "pg";
import { getClient } from "../DataBase/DBconnection";

export class PostDataAccessSQL implements IPostDataAccess<Post> {
    private client: Client;
    constructor() {
        this.client = getClient();
    }

    //post methods

    async addPost(post: Post): Promise<void> {
        try {
            const query = {
                text: "INSERT INTO post (title, body, subject, post_date) VALUES ($1, $2, $3, $4)",
                values: [post.title, post.body, post.subject, post.date]
            };
            await this.client.query(query);
        } catch(error) {
            console.error((error as Error).message);
            
        }
    }

    async getPosts(filterAndPageData: FilterAndPage): Promise<Post[]> {
        try {
            const query = {
                text: "SELECT * FROM public.post ORDER BY post_id ASC",
                values: []
            };
            const dataArray = await this.client.query(query);
            const postsArray: Array<Post> = [];
            for (let post of dataArray.rows) {
                const day = post.post_date.getDate().toString().padStart(2, '0');
                const month = (post.post_date.getMonth() + 1).toString().padStart(2, '0');
                const year = post.post_date.getFullYear().toString().slice(2);
                
                postsArray.push(new Post(post.post_id, post.title, post.body, post.subject, `${day}-${month}-${year}`));
            }
            return postsArray;

        } catch(error) {
            console.error((error as Error).message);
            throw error;
        }
    }
    async getPost(id: number): Promise<Post> {
        try {
            const query = {
                text: "SELECT * FROM public.post WHERE post_id = $1",
                values: [id]
            };
            const post =  await this.client.query(query);
            return post.rows[0];
        } catch (error) {
            console.error((error as Error).message);
            throw error;
        }
    }
    async editPost(id: number, editDetails: Partial<Post>): Promise<void> {
        const existingPost = await this.getPost(id);
        console.log(existingPost);
        
        const updatedPost = {...existingPost, ...editDetails}; 
        console.log(updatedPost);
        
        try {
            const query = {
                text: `UPDATE post SET title = $1, body = $2, subject = $3, post_date = $4 WHERE post_id = $5`,
                value: [updatedPost.title, updatedPost.body, updatedPost.subject, updatedPost.date, id]
            }
        await this.client.query(query);

        } catch(error) {
            console.error((error as Error).message);
            throw error; 
        }
    }
    removePost(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }



}