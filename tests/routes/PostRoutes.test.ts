describe('API Tests', () => {

    let id = 117;
    const globalUrl = 'http://localhost:5000/post/';



    it('should create a new post and return a 201 status', async () => {
        const postData = {
            "title": "my name is guy",
            "body": "im 28 y/o (almost 29)",
            "subject": "dailydigest",
            "date": "24-04-95"
        };

        const response = await fetch(globalUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        expect(response.status).toBe(201);
    });



    it('return the posts by the id', async () => {
        const response = await fetch(globalUrl+id);
        const responseJson = await response.json();


        expect(response.status).toBe(200);
        expect("my name is guy").toBe(responseJson.title);
        
    });

    it('deletes post by id', async () => {
        const response = await fetch(globalUrl+id, {method: 'DELETE'});


        expect(response.status).toBe(200);
        id+=1;
    });


});