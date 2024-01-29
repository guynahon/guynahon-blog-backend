import express, { Request, Response } from "express";
require("dotenv/config");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: any) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

const checkUser = async (sub: number) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${sub}`);      
      const user = await response.json();
      if (user) {
        return true;
      }
    } catch {
        return false;
    }
  };


const callAddUser = async (profile: any) => {
    await fetch(`http://localhost:5000/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });
}


router.post("/", async (req: Request, res: Response) => {
    try {
        
        if (req.body.credential) {
            const verificationResponse = await verifyGoogleToken(req.body.credential);
            
            if (verificationResponse.error) {
                return res.status(400).json({
                    message: verificationResponse.error,
                });
            }
    
            const profile = verificationResponse?.payload;
    
            const getTheUser = await checkUser(profile.sub);  
            
            if (!getTheUser) { 
                callAddUser({sub: profile.sub, email: profile.email});
                res.status(201).json({
                    message: "Signup was successful",
                    user: {
                        id: profile?.sub,
                        firstName: profile?.given_name,
                        lastName: profile?.family_name,
                        picture: profile?.picture,
                        email: profile?.email,
                        token: jwt.sign({ email: profile?.email }, "myScret", {
                            expiresIn: "1d",
                        }),
                    },
                });
            } else {
                res.status(200).json({
                    message: "SignIn was successful",
                    user: {
                        id: profile?.sub,
                        firstName: profile?.given_name,
                        lastName: profile?.family_name,
                        picture: profile?.picture,
                        email: profile?.email,
                        token: jwt.sign({ email: profile?.email }, "myScret", {
                            expiresIn: "1d",
                        }),
                    },
                });
            }
        }
    } catch (error) {
        console.error("Registration failed.")
        res.status(500).json({
            message: "An error occurred. Registration failed.",
        });
    
    }

});

export default router