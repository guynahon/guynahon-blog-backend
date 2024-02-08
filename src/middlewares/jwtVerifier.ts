import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
require('dotenv/config');

export const jwtUserVerifier = (req: Request, res: Response, next: NextFunction) => {
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

export const jwtAdminVerifier = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers.token;
        if (token === 'undefined') {
            throw new Error('Unauthorized');
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const timeStamp = payload.exp - ((Math.floor(Date.now() / 1000)));
        if (timeStamp < 0) {
            throw new Error('Expired Token');
        }

        const adminPromise = await fetch(`${process.env.SERVER_ROUTE}/users/${payload.id}`);
        const admin = await adminPromise.json();
        if (!admin.admin) {
            throw new Error('Unauthorized');
        }

        next();

    } catch (err) {
        console.error((err as Error).message);
        res.status(401).send((err as Error).message);
    }
};

