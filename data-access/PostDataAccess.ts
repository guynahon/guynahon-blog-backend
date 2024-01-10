import { FilterAndPage } from "../models/FilterAndPage";

export interface PostDataAccess <Post> {
    
    addPost(post: Post): Promise<void>;
    getPosts(filterAndPageData: FilterAndPage): Promise<Array<Post>>;
    getPost(id: number): Promise<Post>;
    editPost(id: number, editDetails: Partial<Post>): Promise<void>;
    removePost(id: number): Promise<void>;
}