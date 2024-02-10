// when testing need to remove the jwt middleware from the routes and change the db name!!!

describe('API CRUD Tests', () => {

    let id = 11;
    const globalUrl = 'http://localhost:5000/post/';



    it('should create a new post and return a 201 status', async () => {
        const postData = {
            "title": "my name is guy",
            "body": "im 28 y/o (almost 29)",
            "subject": "dailydigest",
            "date": "24-04-24",
            "image_url": "http://something.png",
            "posted_by": "123"
        };

        const response = await fetch(globalUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        });

        expect(response.status).toBe(201);
    });



    it('return the post by the id', async () => {
        const response = await fetch(globalUrl+id);
        const responseJson = await response.json();


        expect(response.status).toBe(200);
        expect("my name is guy").toBe(responseJson.title);
        
    });


    it('edit the post by the id and new content', async () => {
        const editData = {
            "title": "im a new title",
            "subject": "tutorials",
            "image_url": "http://somethingelse.png"
        };
        const response = await fetch(globalUrl+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData),
        });

        expect(response.status).toBe(200);

        const response2 = await fetch(globalUrl+id);
        const responseJson2 = await response2.json();

        
        expect("im a new title").toBe(responseJson2.title);
        expect("tutorials").toBe(responseJson2.subject);
        expect("http://somethingelse.png").toBe(responseJson2.image_url);
        
    });

    it('deletes post by id', async () => {
        const response = await fetch(globalUrl+id, {method: 'DELETE'});
        expect(response.status).toBe(200);
    });


});

describe('API PAGING Tests', () => {
    const globalUrl = 'http://localhost:5000/post';

    it('paging test- should return 4 post with daily digest subject with ids of 1,4,7,10', async () => {
        const response = await fetch(`${globalUrl}?subject=dailydigest&from=0&to=4`);
        const resJson = await response.json();
        expect(resJson.length).toBe(4);

        let count = 1;
        for(let elem of resJson) {
            expect(elem.subject).toBe("dailydigest");
            expect(elem.id).toBe(count);
            count += 3;
        }
    });
});