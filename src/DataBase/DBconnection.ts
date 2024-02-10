import {Client} from 'pg';
require("dotenv/config");

const client: Client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    // database: "testblog",
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    // ssl: true
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