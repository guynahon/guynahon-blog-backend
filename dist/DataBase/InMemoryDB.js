"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDB {
    constructor() {
        this.posts = new Map();
    }
    ;
    static getInstance() {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }
    //POST METHODS
    addPost(post) {
        this.posts.set(post.id, post);
    }
    getPost(id) {
        return this.posts.get(id);
    }
    editPost(id, editDetails) {
        let post = this.posts.get(id);
        if (post) {
            post = Object.assign(Object.assign({}, post), editDetails);
            this.posts.set(id, post);
        }
    }
    removePost(id) {
        this.posts.delete(id);
    }
}
exports.default = InMemoryDB;
