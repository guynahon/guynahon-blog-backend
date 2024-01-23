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

const getUserData = async (access_token: string | undefined | null) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();

    console.log('data', data); // add error checking
    
};

router.get('/', async (req: Request, res: Response) => {
    const code: any  = req.query.code;
    try {
        const redirectUrl = 'http://127.0.0.1:5000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const response = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(response.tokens);
        console.log('tokens aquired!');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
        
    } catch (error) {
        console.log("Error with signing in with google!");
        
    }
});


export default router;