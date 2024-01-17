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
exports.PostController = void 0;
const Post_1 = __importDefault(require("../models/Post"));
class PostController {
    constructor(postServices) {
        this.postServices = postServices;
    }
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postData = req.body;
            console.log(postData);
            const post = new Post_1.default(null, postData.title, postData.body, postData.subject, postData.date);
            try {
                yield this.postServices.addPost(post);
                console.log("success");
                res.status(201).send('post created!');
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectAndFilterAndPageData = {
                subject: req.query.subject,
                from: req.query.from,
                to: req.query.to,
                filterBy: req.query.filterBy
            };
            try {
                const postsList = yield this.postServices.getPosts(subjectAndFilterAndPageData);
                res.status(200).send(postsList);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    clearPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.postServices.clearPosts();
                res.status(200).send("cleared all posts");
            }
            catch (error) {
                res.status(404).send("failed clearing all posts");
            }
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            try {
                const post = yield this.postServices.getPost(postId);
                res.status(200).send(post);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    editPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            const editDetails = req.body;
            try {
                yield this.postServices.editPost(postId, editDetails);
                res.status(200).send('post edited');
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    removePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            console.log(postId);
            try {
                yield this.postServices.removePost(postId);
                res.status(200).send('post removed');
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
}
exports.PostController = PostController;
