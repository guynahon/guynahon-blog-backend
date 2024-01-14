"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDataAccessSQL = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const DBconnection_1 = require("../DataBase/DBconnection");
class PostDataAccessSQL {
    constructor() {
        this.client = (0, DBconnection_1.getClient)();
    }
    //post methods
    addPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: "INSERT INTO post (title, body, subject, post_date) VALUES ($1, $2, $3, $4)",
                    values: [post.title, post.body, post.subject, post.date]
                };
                yield this.client.query(query);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    getPosts(filterAndPageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: "SELECT * FROM public.post ORDER BY post_id ASC",
                    values: []
                };
                const dataArray = yield this.client.query(query);
                const postsArray = [];
                for (let post of dataArray.rows) {
                    const day = post.post_date.getDate().toString().padStart(2, '0');
                    const month = (post.post_date.getMonth() + 1).toString().padStart(2, '0');
                    const year = post.post_date.getFullYear().toString().slice(2);
                    postsArray.push(new Post_1.default(post.post_id, post.title, post.body, post.subject, `${day}-${month}-${year}`));
                }
                return postsArray;
            }
            catch (error) {
                console.error(error.message);
                throw error;
            }
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: "SELECT * FROM public.post WHERE post_id = $1",
                    values: [id]
                };
                const post = yield this.client.query(query);
                return post.rows[0];
            }
            catch (error) {
                console.error(error.message);
                throw error;
            }
        });
    }
    editPost(id, editDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingPost = yield this.getPost(id);
            console.log(existingPost);
            const updatedPost = Object.assign(Object.assign({}, existingPost), editDetails);
            console.log(updatedPost);
            try {
                const query = {
                    text: `UPDATE post SET title = $1, body = $2, subject = $3, post_date = $4 WHERE post_id = $5`,
                    value: [updatedPost.title, updatedPost.body, updatedPost.subject, updatedPost.date, id]
                };
                yield this.client.query(query);
            }
            catch (error) {
                console.error(error.message);
                throw error;
            }
        });
    }
    removePost(id) {
        throw new Error("Method not implemented.");
    }
}
exports.PostDataAccessSQL = PostDataAccessSQL;
