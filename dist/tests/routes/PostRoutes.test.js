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
describe('API Tests', () => {
    let id = 102;
    describe('POST /post', () => {
        it('should create a new post and return a 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const postData = {
                "title": "my name is guy",
                "body": "im 28 y/o (almost 29)",
                "subject": "dailydigest",
                "date": "24-04-95"
            };
            const response = yield fetch('http://localhost:5000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            expect(response.status).toBe(201);
        }));
    });
    describe('GET /post/:id', () => {
        it('return the posts by the id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:5000/post/${id}`);
            const responseJson = yield response.json();
            expect(response.status).toBe(200);
            expect("my name is guy").toBe(responseJson.title);
        }));
    });
    describe('DELETE /post/:id', () => {
        it('deletes post by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:5000/post/${id}/`, { method: 'DELETE' });
            expect(response.status).toBe(200);
            id += 1;
        }));
    });
});
