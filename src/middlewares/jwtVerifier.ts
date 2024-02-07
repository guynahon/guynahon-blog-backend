import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
require('dotenv/config');

export const jwtVerifier = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;        
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const timeStamp = payload.exp - ((Math.floor(Date.now() / 1000)));
        if (timeStamp < 0) {
            throw new Error('token expired!');
        }
        next();

    } catch (err) {
        console.error((err as Error).message);
        res.status(401).send("Unauthorized");
    }
};

