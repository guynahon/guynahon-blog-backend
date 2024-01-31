import {Client} from 'pg';
require("dotenv/config");

const client: Client = new Client({
    // user: 'szzkvkwh',
    // host: 'rogue.db.elephantsql.com',
    // database: 'szzkvkwh',
    // password: 'C5ySi8NstjJ6YOHFJoqV7eI_k9avUJ-_',
    // port: 5432
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});



async function blogConnect() {
    try {
        await client.connect();
        console.log("connected to postgresql");        
    } catch (error) {
        console.error("error connecting to postgres"+error);
    }
}

blogConnect();

export function getClient(): Client {
    return client;
}