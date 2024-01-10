import Post from "../models/Post";

class InMemoryDB {
    private static instance: InMemoryDB;
    private constructor() {};

    private posts: Map<number, Post> = new Map();

    public static getInstance(): InMemoryDB {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }


    //POST METHODS
    addPost(post: Post): void {
        this.posts.set(post.id, post);
    }

    getPost(id: number): Post | undefined {
        return this.posts.get(id);
    }

    editPost(id: number, editDetails: Partial<Post>): void {
        let post = this.posts.get(id);
        if (post) {
            post = {...post, ...editDetails}
            this.posts.set(id, post);
        }
    }

    removePost(id: number): void {
        this.posts.delete(id);
    }
}

export default InMemoryDB;