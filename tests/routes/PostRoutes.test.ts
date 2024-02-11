// when testing need to remove the jwt middleware from the routes and change the db name!!!
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwOTkzMjM3MzAxOTk5NzkyMzQwMSIsImZpcnN0TmFtZSI6Ikd1eSIsImxhc3ROYW1lIjoiTmFob24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3g0d1Nmcmx4eG1Vc0RyVVJ5d2MyeThudmRvcXFWZDJULTJXU1ZvWF9JPXM5Ni1jIiwiZW1haWwiOiJndXkubmFob25AZ3J1bml0ZWNoLmNvbSIsImlhdCI6MTcwNzY2NDk4NywiZXhwIjoxNzM5MjIyNTg3fQ.MLKEEgNIcJ_00FpkAWBpUlDA2o9akm3Xgkdc1FqqLlo"

describe('API CRUD Tests', () => {

    let id = 16;
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
                'Content-Type': 'application/json',
                "token": token
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
                'Content-Type': 'application/json',
                "token": token
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
        const response = await fetch(globalUrl+id, {
            method: 'DELETE',
            headers: {
                "token": token
            }
        });
        expect(response.status).toBe(200);
    });


});

describe('API PAGING Tests', () => {
    const globalUrl = 'http://localhost:5000/post';

    it('paging test- should return 4 post with daily digest subject with ids of 1,4,7,10,13', async () => {
        const response = await fetch(`${globalUrl}?subject=dailydigest&from=0&to=5`);
        const resJson = await response.json();
        expect(resJson.length).toBe(5);

        let count = 1;
        for(let elem of resJson) {
            expect(elem.subject).toBe("dailydigest");
            expect(elem.id).toBe(count);
            count += 3;
        }
    });
});


describe('API posts by user tests', () => {
    const globalUrl = 'http://localhost:5000/post';

    it('posts by user should return for user 109932373019997923401 should return 7 posts', async () => {
        const response = await fetch(`${globalUrl}/profile?id=109932373019997923401&from=1&to=15`,{headers: {"token": token}});
        const responseJson = await response.json();

        expect(responseJson.length).toBe(7);

        for(let elem of responseJson) {
            expect(elem.posted_by).toBe("109932373019997923401");
        }
    });
});


describe('API posts by last name', () => {
    const globalUrl = 'http://localhost:5000/post';

    it('posts by users last name "smith" should return 4 posts by 2 people', async () => {
        const response = await fetch(`${globalUrl}/lastname?lastName=smith`,{headers: {"token": token}});
        const responseJson = await response.json();

        expect(responseJson.length).toBe(4);
        
    });
});