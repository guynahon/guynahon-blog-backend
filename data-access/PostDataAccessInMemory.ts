import Post from "../models/Post";
import { IPostDataAccess } from "./IPostDataAccess";
import InMemoryDB from '../DataBase/InMemoryDB'
import { SubjectAndFilterAndPage } from "../models/TypeSubjectAndFilterAndPage";

export class PostDataAccessInMemory implements IPostDataAccess<Post> {
    clearPosts(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private db = InMemoryDB.getInstance();

    //post methods

    async addPost(post: Post): Promise<void> {
        await this.db.addPost(post);
    }

    async getPosts(filterAndPageData: SubjectAndFilterAndPage): Promise<Array<Post>> {
        const postsList = await this.db.getPosts(filterAndPageData);
        if (!postsList) {
            throw new Error("there are no posts")
        }
        return postsList;
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