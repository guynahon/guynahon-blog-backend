import Post from "../models/Post";
import { DataAccess } from "./DataAccess";

export class PostDataAccess implements DataAccess<Post> {
    add(post: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    edit(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}