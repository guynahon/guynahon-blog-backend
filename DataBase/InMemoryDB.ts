import { FilterAndPage } from "../models/TypeFilterAndPage";
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
         const filterBy = filteringAndPagingData.filterBy;
         return this.filterHelper(this.pagingHelper(postsArray, from, to), filterBy);
    }

    private pagingHelper(postsArray:Array<Post>, from: number | undefined, to: number | undefined) {
        if (from && to && 0 <= from && postsArray.length > to) {
            postsArray = postsArray.slice(from-1, to);
         }
         return postsArray;
    }

    private filterHelper(postsArray:Array<Post>, filterBy: string | undefined) {
        if (filterBy) {
            postsArray = postsArray.filter((post) => post.title.toLowerCase().includes(filterBy.toLowerCase().trim()));
         }
         return postsArray;
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