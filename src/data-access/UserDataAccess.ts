import { Client } from "pg";
import { getClient } from "../DataBase/DBconnection";
import User from "../models/User";


export class UserDataAccess {
    private client: Client;
    constructor() {
        this.client = getClient();
    }


    async addUser(user: User): Promise<void> {
        try {
            const query = {
                text: "INSERT INTO users (id, email, admin) VALUES ($1, $2, $3)",
                values: [user.id, user.email, false]
            };
            await this.client.query(query);
        } catch(error) {
            console.error((error as Error).message);
            throw error;
        }
    }

    async getUser(id: string): Promise<User> {    
        try {
            const query = {
                text: "SELECT * FROM public.users WHERE id = $1",
                values: [id]
            };
            const user =  await this.client.query(query);
            return user.rows[0];
        } catch (error) {
            console.error((error as Error).message);
            throw error;
        }
    }

}