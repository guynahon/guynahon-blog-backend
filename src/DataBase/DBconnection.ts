import {Client} from 'pg';
require("dotenv/config");

const client: Client = new Client({
    // user: 'szzkvkwh',
    // host: 'rogue.db.elephantsql.com',
    // database: 'szzkvkwh',
    // password: process.env.POSTGRESS_PASSWORD,
    // port: 5432
    user: 'postgres',
    host: 'localhost',
    database: 'Blog',
    password: process.env.LOCAL_POSTGRES_PASSWORD,
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