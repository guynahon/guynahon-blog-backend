import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    
    const redirectUrl = 'http://127.0.0.1:5000/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );
    
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        promt: 'consent'
    });

    res.json({url: authorizeUrl});

});

export default router;