type PostObject = {
    title: string;
    body: string;
    subject: string;
    date: string;
};

const addPostToDB = async (post: PostObject) => {
    try {
        const newPost = {
            "title": post.title,
            "body": post.body,
            "subject": post.subject,
            "date": post.date
        };

        await fetch(`http://localhost:5000/post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
    } catch (error) {
        console.error("error in adding post", error);
    }
};

const getPostFromDB = async (postId: number) => {
    try {
        const response = await fetch(`http://localhost:5000/post/${postId}`);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};




describe('All Posts API', () => {

    it('Adds a new post then checks it and then deletes it' ,async () => {


        const dataToSend = {
            "title": "my name is guy",
            "body": "im 28 y/o (almost 29)",
            "subject": "dailydigest",
            "date": "24-04-95"
        };
        addPostToDB(dataToSend);

        const res = await getPostFromDB(67);
        console.log(res.title);
        console.log(dataToSend.title);
        
        

        expect(dataToSend.title).toBe(res.title);
        expect(dataToSend.body).toBe(res.body);
        expect(dataToSend.subject).toBe(res.subject);
        
    });
});