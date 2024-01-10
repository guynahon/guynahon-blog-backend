export interface DataAccess <Post>{
    add(post: Post): Promise<void>;
    get(id: number): Promise<Post>;
    edit(id: number): Promise<void>;
    remove(id: number): Promise<void>;
}