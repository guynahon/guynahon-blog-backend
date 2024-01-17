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
const addPostToDB = (post) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = {
            "title": post.title,
            "body": post.body,
            "subject": post.subject,
            "date": post.date
        };
        yield fetch(`http://localhost:5000/post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
    }
    catch (error) {
        console.error("error in adding post", error);
    }
});
const getPostFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:5000/post/${postId}`);
        const jsonData = yield response.json();
        return jsonData;
    }
    catch (error) {
        console.error('Error fetching post:', error);
    }
});
describe('All Posts API', () => {
    it('Adds a new post then checks it and then deletes it', () => __awaiter(void 0, void 0, void 0, function* () {
        const dataToSend = {
            "title": "my name is guy",
            "body": "im 28 y/o (almost 29)",
            "subject": "dailydigest",
            "date": "24-04-95"
        };
        addPostToDB(dataToSend);
        const res = yield getPostFromDB(67);
        console.log(res.title);
        console.log(dataToSend.title);
        expect(dataToSend.title).toBe(res.title);
        expect(dataToSend.body).toBe(res.body);
        expect(dataToSend.subject).toBe(res.subject);
    }));
});
