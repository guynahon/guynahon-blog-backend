class Post {
    private static idCounter: number = 1;
    id: number;
    title: string;
    body: string;
    subject: string;
    date: string;

    constructor(title: string, body: string, subject: string, date: string) { 
        this.id = Post.idCounter++;
        this.title = title;
        this.body = body;
        this.subject = subject;
        this.date = date;
    }
}

export default Post