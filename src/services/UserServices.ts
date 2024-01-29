import { UserDataAccess } from "../data-access/UserDataAccess";
import User from "../models/User";

export class UserServices {

    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async addUser(user: User): Promise<void>{
        try {
            await this.userDataAccess.addUser(user);
        } catch(error) {
            throw new Error(`Unable to add user: ${(error as Error).message}`);
        }
    }


    
    async getUser(userId: string): Promise<User> {
        const user = await this.userDataAccess.getUser(userId);
        if (user) {
            return user;
        } else {
            throw new Error(`user with the ID ${userId} not found !`);
        }
    }

}