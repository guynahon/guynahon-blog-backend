"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(title, body, subject, date) {
        this.id = Date.now();
        this.title = title;
        this.body = body;
        this.subject = subject;
        this.date = date;
    }
}
exports.default = Post;
