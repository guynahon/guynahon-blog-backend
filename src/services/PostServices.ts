import { PostDataAccessSQL } from "../data-access/PostDataAccessSQL";
import { SubjectAndFilterAndPage, IdAndFilterAndPage } from "../models/TypeSubjectAndFilterAndPage";
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

    async getPosts(subjectAndFilterAndPageData: SubjectAndFilterAndPage): Promise<Array<Post>>{
        const postsList = await this.postDataAccess.getPosts(subjectAndFilterAndPageData);
        if (postsList) {
            return postsList;
        } else {
            throw new Error("there are no posts");
        }
    }

    async clearPosts(): Promise<void> {
        try {
            await this.postDataAccess.clearPosts();
        } catch (error) {
            throw new Error(`Unable to clear posts: ${(error as Error).message}`);
        }
    }

    async getPostsByUserId(idAndFilterAndPageData: IdAndFilterAndPage): Promise<Array<Post>>{
        const postsList = await this.postDataAccess.getPostsByUserId(idAndFilterAndPageData);
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