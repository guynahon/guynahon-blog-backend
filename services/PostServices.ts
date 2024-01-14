import { PostDataAccessSQL } from "../data-access/PostDataAccessSQL";
import { FilterAndPage } from "../models/TypeFilterAndPage";
import Post from "../models/Post";

export class PostServices {

    private postDataAccess: PostDataAccessSQL;

    constructor(postDataAccess: PostDataAccessSQL) {
        this.postDataAccess = postDataAccess;
    }

    async addPost(post: Post): Promise<void>{
        try {
            await this.postDataAccess.addPost(post);
        } catch(error) {
            throw new Error(`Unable to add post: ${(error as Error).message}`);
        }
    }

    async getPosts(filterAndPageData: FilterAndPage): Promise<Array<Post>>{
        const postsList = await this.postDataAccess.getPosts(filterAndPageData);
        if (postsList) {
            return postsList;
        } else {
            throw new Error("there are no posts");
        }
    }

    async getPost(postId: number): Promise<Post> {
        const post = await this.postDataAccess.getPost(postId);
        if (post) {
            return post;
        } else {
            throw new Error(`post with the ID ${postId} not found !`);
        }
    }

    async editPost(postId: number, editDetails: Partial<Post>): Promise<void> {
        try {
        await this.postDataAccess.editPost(postId, editDetails);
        } catch {
            throw new Error(`unable to update post with the ID : ${postId}`);
        }
    }

    async removePost(postId: number): Promise<void> {
        try {
            await this.postDataAccess.removePost(postId);
        } catch(error) {
            throw new Error(`unable to remove post with the ID: ${postId}`)
        }
    }
}