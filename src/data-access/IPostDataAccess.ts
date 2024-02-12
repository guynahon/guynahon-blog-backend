import { SubjectAndFilterAndPage } from "../models/TypeSubjectAndFilterAndPage";

export interface IPostDataAccess <T> {
    addPost(post: T): Promise<void>;
    getPosts(filterAndPageData: SubjectAndFilterAndPage): Promise<Array<T>>;
    clearPosts(): Promise<void>;
    getPost(id: number): Promise<T>;
    editPost(id: number, editDetails: Partial<T>): Promise<void>;
    removePost(id: number): Promise<void>;
}