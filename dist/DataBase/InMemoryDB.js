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
        // this.posts.set(post.id, post);
    }
    getPosts(filteringAndPagingData) {
        let postsArray = Array.from(this.posts.values());
        const from = filteringAndPagingData.from;
        const to = filteringAndPagingData.to;
        const filterBy = filteringAndPagingData.filterBy;
        return this.filterHelper(this.pagingHelper(postsArray, from, to), filterBy);
    }
    pagingHelper(postsArray, from, to) {
        if (from && to && 0 <= from && postsArray.length > to) {
            postsArray = postsArray.slice(from - 1, to);
        }
        return postsArray;
    }
    filterHelper(postsArray, filterBy) {
        if (filterBy) {
            postsArray = postsArray.filter((post) => post.title.toLowerCase().includes(filterBy.toLowerCase().trim()));
        }
        return postsArray;
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
