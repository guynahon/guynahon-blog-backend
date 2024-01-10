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
exports.PostDataAccessInMemory = void 0;
const InMemoryDB_1 = __importDefault(require("../DataBase/InMemoryDB"));
class PostDataAccessInMemory {
    constructor() {
        this.db = InMemoryDB_1.default.getInstance();
    }
    //post methods
    addPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.addPost(post);
        });
    }
    getPosts(filterAndPageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const postsList = yield this.db.getPosts(filterAndPageData);
            if (!postsList) {
                throw new Error("there are no posts");
            }
            return postsList;
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.db.getPost(id);
            if (!post) {
                throw new Error(`Post with ID ${id} not found`);
            }
            return post;
        });
    }
    editPost(id, editDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.db.getPost(id);
            if (!post) {
                throw new Error(`Post with ID ${id} not found`);
            }
            yield this.db.editPost(id, editDetails);
        });
    }
    removePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.db.getPost(id);
            if (!post) {
                throw new Error(`Post with ID ${id} not found`);
            }
            yield this.db.removePost(id);
        });
    }
}
exports.PostDataAccessInMemory = PostDataAccessInMemory;
