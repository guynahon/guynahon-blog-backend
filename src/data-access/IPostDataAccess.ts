import { SubjectAndFilterAndPage } from "../models/TypeSubjectAndFilterAndPage";

export interface IPostDataAccess <Post> {
    
    addPost(post: Post): Promise<void>;
    getPosts(filterAndPageData: SubjectAndFilterAndPage): Promise<Array<Post>>;
    clearPosts(): Promise<void>;
    getPost(id: number): Promise<Post>;
    editPost(id: number, editDetails: Partial<Post>): Promise<void>;
    removePost(id: number): Promise<void>;
}