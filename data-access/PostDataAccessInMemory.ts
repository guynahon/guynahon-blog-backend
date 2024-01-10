import Post from "../models/Post";
import { PostDataAccess } from "./PostDataAccess";
import InMemoryDB from '../DataBase/InMemoryDB'

export class PostDataAccessInMemory implements PostDataAccess<Post> {
    private db = InMemoryDB.getInstance();

    //post methods

    async addPost(post: Post): Promise<void> {
        await this.db.addPost(post);
    }
    async getPost(id: number): Promise<Post> {
        const post = await this.db.getPost(id);
        if (!post) {
            throw new Error(`Post with ID ${id} not found`)
        }
        return post;
    }
    async editPost(id: number, editDetails: Partial<Post>): Promise<void> {
        const post = this.db.getPost(id);
        if (!post) {
            throw new Error(`Post with ID ${id} not found`)
        }
        await this.db.editPost(id, editDetails);
    }
    async removePost(id: number): Promise<void> {
        const post = this.db.getPost(id);
        if (!post) {
            throw new Error(`Post with ID ${id} not found`)
        }
        await this.db.removePost(id);
    }

}