import { FilterAndPage } from "../models/FilterAndPage";
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

    getPosts(filteringAndPagingData: FilterAndPage): Array<Post> {
         let postsArray = Array.from(this.posts.values());
         const from = filteringAndPagingData.from;
         const to = filteringAndPagingData.to;
         const filterBy= filteringAndPagingData.filterBy;
         if (from && to && typeof postsArray[from-1] !== 'undefined' && typeof postsArray[to-1] !== 'undefined') {
            postsArray = postsArray.slice(from-1, to);
         }
         if (filterBy) {
            postsArray = postsArray.filter((post) => post.title.includes(filterBy));
         }
         return postsArray
         
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