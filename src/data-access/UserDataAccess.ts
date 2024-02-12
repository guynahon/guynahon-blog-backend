import { Client } from "pg";
import { client } from "../DataBase/DBconnection";
import User from "../models/User";

export class UserDataAccess {
    private client: Client;
    
    constructor() {
        this.client = client;
    }

    async addUser(user: User): Promise<void> {
        try {
            const query = {
                text: "INSERT INTO users (id, email, first_name, last_name, admin) VALUES ($1, $2, $3, $4, $5)",
                values: [user.id, user.email, user.firstName, user.lastName, false]
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