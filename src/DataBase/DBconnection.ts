import {Client} from 'pg';
import { postgresPassword } from '../DataBasePassword';

const client: Client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Blog',
    password: postgresPassword,
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