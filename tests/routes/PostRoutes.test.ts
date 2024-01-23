describe('API Tests', () => {

    let id = 102;


    describe('POST /post', () => {
        it('should create a new post and return a 201 status', async () => {
            const postData = {
                "title": "my name is guy",
                "body": "im 28 y/o (almost 29)",
                "subject": "dailydigest",
                "date": "24-04-95"
            };

            const response = await fetch('http://localhost:5000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            expect(response.status).toBe(201);
        });
    });

    describe('GET /post/:id', () => {
        it('return the posts by the id', async () => {
            const response = await fetch(`http://localhost:5000/post/${id}`);
            const responseJson = await response.json();
            
            expect(response.status).toBe(200);
            expect("my name is guy").toBe(responseJson.title);
            
        });
    });

    describe('DELETE /post/:id', () => {
        it('deletes post by id', async () => {
            const response = await fetch(`http://localhost:5000/post/${id}/`, {method: 'DELETE'});

            expect(response.status).toBe(200);
            id+=1;
        });
    });

});