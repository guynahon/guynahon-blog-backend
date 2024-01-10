"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(title, body, subject, date) {
        this.id = Post.idCounter++;
        this.title = title;
        this.body = body;
        this.subject = subject;
        this.date = date;
    }
}
Post.idCounter = 1;
exports.default = Post;
