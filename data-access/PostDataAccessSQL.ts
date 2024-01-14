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
                text: "INSERT INTO post (title, body, subject, date) VALUES ($1, $2, $3, $4)",
                values: [post.title, post.body, post.subject, post.date]
            };
            await this.client.query(query);
        } catch(error) {
            console.error((error as Error).message);
            throw error;
        }
    }


    async getPosts(filterAndPageData: FilterAndPage): Promise<Post[]> {
        try {
            const query = {
                text: "SELECT * FROM post ORDER BY id ASC",
                values: []
            };
            const dataArray = await this.client.query(query);
            const postsArray: Array<Post> = [];
            for (let post of dataArray.rows) {
                const day = post.date.getDate().toString().padStart(2, '0');
                const month = (post.date.getMonth() + 1).toString().padStart(2, '0');
                const year = post.date.getFullYear().toString();
                console.log(`${year}-${month}-${day}`);
                
                postsArray.push(new Post(post.id, post.title, post.body, post.subject, `${year}-${month}-${day}`));
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
                text: "SELECT * FROM public.post WHERE id = $1",
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
        const updatedPost = {...existingPost, ...editDetails}; 
        try {
            const query = `UPDATE post SET title = $1, body = $2, subject = $3, date = $4 WHERE id = $5`;
            await this.client.query(query, [updatedPost.title, updatedPost.body, updatedPost.subject, updatedPost.date, id]);
        } catch(error) {
            console.error((error as Error).message);
            throw error; 
        }
    }


    async removePost(id: number): Promise<void> {
        try {
            const query = {
                text: "DELETE FROM post WHERE id = $1",
                values: [id]
            }
            await this.client.query(query);
        } catch (error) {
            console.log((error as Error).message);
            throw error;
            
        }
    }
}