import Post from "../models/Post";
import { IPostDataAccess } from "./IPostDataAccess";
import { IdAndFilterAndPage, SubjectAndFilterAndPage } from "../models/TypeSubjectAndFilterAndPage";
import { Client } from "pg";
import { getClient } from "../DataBase/DBconnection";

export class PostDataAccessSQL implements IPostDataAccess<Post> {
    private client: Client;
    constructor() {
        this.client = getClient();
    }

    async addPost(post: Post): Promise<void> {
        try {
            const query = {
                text: "INSERT INTO post (title, body, subject, date, image_url, posted_by) VALUES ($1, $2, $3, $4, $5, $6)",
                values: [post.title, post.body, post.subject, post.date, post.image_url, post.posted_by]
            };
            await this.client.query(query);
        } catch(error) {
            console.error((error as Error).message);
            throw error;
        }
    }


    async getPosts(subjectAndFilterAndPageData: SubjectAndFilterAndPage): Promise<Post[]> {
        const subject = subjectAndFilterAndPageData.subject;
        const from = subjectAndFilterAndPageData.from;
        const to = subjectAndFilterAndPageData.to;
        const filterBy = subjectAndFilterAndPageData.filterBy;
        let query;
        try {
            if((from && to) && filterBy) {
                query = {
                    text: `
                    WITH afterSubject AS (
                        SELECT *
                        FROM post
                        WHERE subject = $1
                    ),
                    afterFromTo AS (
                        SELECT *, ROW_NUMBER() OVER (ORDER BY id ASC) AS row_num
                        FROM afterSubject
                    )
                    SELECT *
                    FROM afterFromTo
                    WHERE (row_num BETWEEN $2 AND $3) AND (LOWER(title) LIKE $4)
                    ORDER BY id ASC;
                    `,
                    values: [subject, +from, +to, `%${filterBy.toLowerCase().trim()}%`]
                };
            } else if ((!from || !to) && filterBy) {
                query = {
                    text: `
                    WITH afterSubject AS (
                        SELECT *
                        FROM post
                        WHERE subject = $1
                    )
                    SELECT * FROM afterSubject WHERE LOWER(title) LIKE $2 ORDER BY id ASC`,
                    values: [subject, `%${filterBy.toLowerCase().trim()}%`]
                };
            } else if ((from && to) && !filterBy) {
                query = {
                    text: `
                    WITH afterSubject AS (
                        SELECT *
                        FROM post
                        WHERE subject = $1
                    )
                    SELECT *
                    FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY id ASC) as row_num FROM afterSubject) AS afterSubjectNumbered
                    WHERE row_num BETWEEN $2 AND $3`,
                    values: [subject, +from, +to]
                };
            } else {
                query = {
                    text: `
                    WITH afterSubject AS (
                        SELECT *
                        FROM post
                        WHERE subject = $1
                    )
                    SELECT * FROM afterSubject ORDER BY id ASC`,
                    values: [subject]
                };
            }
            const dataArray = await this.client.query(query);
            const postsArray: Array<Post> = [];
            for (let post of dataArray.rows) {
                const day = post.date.getDate().toString().padStart(2, '0');
                const month = (post.date.getMonth() + 1).toString().padStart(2, '0');
                const year = post.date.getFullYear().toString();
                
                postsArray.push(new Post(post.id, post.title, post.body, post.subject, `${year}-${month}-${day}`, post.image_url, post.posted_by));
            }
            return postsArray;

        } catch(error) {
            console.error((error as Error).message);
            throw error;
        }
    }

    async clearPosts(): Promise<void> {
        try {
            const query = "DELETE FROM post";
            await this.client.query(query);
        } catch (error) {
            console.error((error as Error).message);
            throw error;
        }
    }

    async getPostsByUserId(idAndFilterAndPageData: IdAndFilterAndPage): Promise<Post[]> {
        const id = idAndFilterAndPageData.id;
        const from = idAndFilterAndPageData.from;
        const to = idAndFilterAndPageData.to;
        const filterBy = idAndFilterAndPageData.filterBy;
        let query;
        try {
            if(from && to) {
                query = {
                    text: `
                    WITH afterId AS (
                        SELECT *
                        FROM post
                        WHERE posted_by LIKE $1
                    )
                    SELECT *
                    FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY id ASC) as row_num FROM afterId) AS afterIdNumbered
                    WHERE row_num BETWEEN $2 AND $3`,
                    values: [id, +from, +to]
                }
            }
            else if(filterBy) {
                query = {
                    text: `
                    WITH afterId AS (
                        SELECT *
                        FROM post
                        WHERE posted_by LIKE $1
                    )
                    SELECT * FROM afterId WHERE LOWER(title) LIKE $2 ORDER BY id ASC`,
                    values: [id, `%${filterBy.toLowerCase().trim()}%`]
                };
            } else {
                throw new Error('cant fetch the posts.');
            }
            const dataArray = await this.client.query(query);
            const postsArray: Array<Post> = [];
            for (let post of dataArray.rows) {
                const day = post.date.getDate().toString().padStart(2, '0');
                const month = (post.date.getMonth() + 1).toString().padStart(2, '0');
                const year = post.date.getFullYear().toString();
                
                postsArray.push(new Post(post.id, post.title, post.body, post.subject, `${year}-${month}-${day}`, post.image_url, post.posted_by));
            }
            return postsArray;

        } catch (error) {
            console.error((error as Error).message);
            throw error;
        }
    }


    async getPost(id: number): Promise<Post> {
        try {
            const query = {
                text: "SELECT * FROM public.post WHERE id = $1",
                values: [id]
            };
            const post =  await this.client.query(query);
            return post.rows[0];
        } catch (error) {
            console.error((error as Error).message);
            throw error;
        }
    }


    async editPost(id: number, editDetails: Partial<Post>): Promise<void> {
        const existingPost = await this.getPost(id);
        const updatedPost = {...existingPost, ...editDetails}; 
        try {
            const query = `UPDATE post SET title = $1, body = $2, subject = $3, date = $4, image_url = $5 WHERE id = $6`;
            await this.client.query(query, [updatedPost.title, updatedPost.body, updatedPost.subject, updatedPost.date, updatedPost.image_url, id]);
        } catch(error) {
            console.error((error as Error).message);
            throw error; 
        }
    }


    async removePost(id: number): Promise<void> {
        try {
            const query = {
                text: "DELETE FROM post WHERE id = $1",
                values: [id]
            }
            await this.client.query(query);
        } catch (error) {
            console.error((error as Error).message);
            throw error;
            
        }
    }
}