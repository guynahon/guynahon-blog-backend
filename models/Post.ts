class Post {
    id: number;
    title: string;
    body: string;
    subject: string;
    date: string;

    constructor(title: string, body: string, subject: string, date: string) { 
        this.id = Date.now();
        this.title = title;
        this.body = body;
        this.subject = subject;
        this.date = date;
    }
}

export default Post