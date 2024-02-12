import { AuthServices } from "../services/AuthServices";
import { Request, Response } from "express";
require("dotenv/config");
const jwt = require("jsonwebtoken");


export class AuthController {
    authServices: AuthServices;

    constructor(authServices: AuthServices) {
        this.authServices = authServices;
    }

    async handleGoogleUser(req: Request, res: Response) {
        try {
            const resList = await this.authServices.handleGoogleUser(req.body);
            const status = resList[0];
            const payload = resList[1];
            if (status === 200) {
                res.status(200).json({
                    message: "SignIn was successful",
                    user: {
                        token: jwt.sign(payload, process.env.JWT_SECRET, {
                            expiresIn: "1d",
                        }),
                    },
                });
            } else if (status === 201) {
                res.status(201).json({
                    message: "Signup was successful",
                    user: {
                        token: jwt.sign(payload, process.env.JWT_SECRET, {
                            expiresIn: "1d",
                        }),
                    },
                });
            }
        } catch(err) {
            console.error("Registration failed.")
            res.status(500).json({
                message: "An error occurred. Registration failed.",
            });
        }
    }
}