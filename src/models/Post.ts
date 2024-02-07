class Post {
    id: number | null;
    title: string;
    body: string;
    subject: string;
    date: string;
    posted_by: string;

    constructor(id: number | null, title: string, body: string, subject: string, date: string, posted_by: string) { 
        this.id = id;
        this.title = title;
        this.body = body;
        this.subject = subject;
        this.date = date;
        this.posted_by = posted_by;
    }
}

export default Post