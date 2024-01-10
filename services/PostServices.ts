import { PostDataAccess } from "../data-access/PostDataAccess";
import Post from "../models/Post";

export class PostServices {

    private postDataAccess: PostDataAccess;

    constructor(postDataAccess: PostDataAccess) {
        this.postDataAccess = postDataAccess;
    }

    async addPost(post: Post): Promise<void>{
        try {
            await this.postDataAccess.add(post);
        } catch(error) {
            throw new Error(`Unable to add post: ${(error as Error).message}`);
        }
    }

    async getPost(postId: number): Promise<Post> {
        const post = await this.postDataAccess.get(postId);
        if (post) {
            return post;
        } else {
            throw new Error(`post with the ID ${postId} not found !`);
        }
    }

    async editPost(postId: number): Promise<void> {
        try {
        await this.postDataAccess.edit(postId);
        } catch {
            throw new Error(`unable to update post with the ID : ${postId}`);
        }
    }

    async removePost(postId: number): Promise<void> {
        try {
            await this.postDataAccess.remove(postId);
        } catch(error) {
            throw new Error(`unable to remove post with the ID: ${postId}`)
        }
    }
}