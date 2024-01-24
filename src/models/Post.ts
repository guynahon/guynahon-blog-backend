class Post {
    id: number | null;
    title: string;
    body: string;
    subject: string;
    date: string;

    constructor(id: number | null, title: string, body: string, subject: string, date: string) { 
        this.id = id;
        this.title = title;
        this.body = body;
        this.subject = subject;
        this.date = date;
    }
}

export default Post