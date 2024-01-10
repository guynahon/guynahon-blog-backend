export interface PostDataAccess <Post> {
    
    addPost(post: Post): Promise<void>;
    getPost(id: number): Promise<Post>;
    editPost(id: number, editDetails: Partial<Post>): Promise<void>;
    removePost(id: number): Promise<void>;
}