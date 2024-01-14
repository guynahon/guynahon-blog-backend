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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
class PostServices {
    constructor(postDataAccess) {
        this.postDataAccess = postDataAccess;
    }
    addPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.postDataAccess.addPost(post);
            }
            catch (error) {
                throw new Error(`Unable to add post: ${error.message}`);
            }
        });
    }
    getPosts(filterAndPageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const postsList = yield this.postDataAccess.getPosts(filterAndPageData);
            if (postsList) {
                return postsList;
            }
            else {
                throw new Error("there are no posts");
            }
        });
    }
    clearPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.postDataAccess.clearPosts();
            }
            catch (error) {
                throw new Error(`Unable to clear posts: ${error.message}`);
            }
        });
    }
    getPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postDataAccess.getPost(postId);
            if (post) {
                return post;
            }
            else {
                throw new Error(`post with the ID ${postId} not found !`);
            }
        });
    }
    editPost(postId, editDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.postDataAccess.editPost(postId, editDetails);
            }
            catch (_a) {
                throw new Error(`unable to update post with the ID : ${postId}`);
            }
        });
    }
    removePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.postDataAccess.removePost(postId);
            }
            catch (error) {
                throw new Error(`unable to remove post with the ID: ${postId}`);
            }
        });
    }
}
exports.PostServices = PostServices;
