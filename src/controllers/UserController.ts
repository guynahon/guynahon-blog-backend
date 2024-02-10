import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import User from "../models/User";

export class UserController {
    private userServices: UserServices;

    constructor(userServices: UserServices) {
        this.userServices = userServices;
    }

    async addUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        
        const user = new User(
            userData.sub,
            userData.email,
            userData.firstName,
            userData.lastName
        );
        
        try {
            await this.userServices.addUser(user)
            
            res.status(201).send('user created!')
            } catch(error) {
                res.status(404).send((error as Error).message)
            }

    }

    async getUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        try {
            const user = await this.userServices.getUser(userId);
            res.status(200).send(user)
        } catch(error) {
            res.status(404).send((error as Error).message)
        }
    }

}