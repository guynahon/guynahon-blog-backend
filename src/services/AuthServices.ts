require("dotenv/config");
const { OAuth2Client } = require("google-auth-library");
import { UserPayload } from "../models/userPayload";


export class AuthServices {
    client: any;
    constructor () {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async verifyGoogleToken(token: any) {
        try {
          const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
          });
          return { payload: ticket.getPayload() };
        } catch (error) {
          return { error: "Invalid user detected. Please try again" };
        }
      }
      
      checkUser = async (sub: number) => {
          try {
            const response = await fetch(`${process.env.SERVER_ROUTE}/users/${sub}`);      
            const user = await response.json();
            if (user) {
              return true;
            }
          } catch {
              return false;
          }
        };
      
      
      callAddUser = async (profile: any) => {
          await fetch(`${process.env.SERVER_ROUTE}/users/`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(profile)
                  });
      }


      async handleGoogleUser(requestBody: any): Promise<[number, UserPayload | {error: string}]> {
        if (requestBody.credential) {
            const verificationResponse = await this.verifyGoogleToken(requestBody.credential);
            
            if (verificationResponse.error) {
                return [400, { error: verificationResponse.error}]
            }
    
            const profile = verificationResponse?.payload;            
    
            const getTheUser = await this.checkUser(profile.sub);  

            const payload: UserPayload ={
                id: profile?.sub,
                firstName: profile?.given_name,
                lastName: profile?.family_name,
                picture: profile?.picture,
                email: profile?.email
            };
            
            if (!getTheUser) { 
                this.callAddUser({sub: profile.sub, email: profile.email, firstName: profile.given_name, lastName: profile.family_name});
                return [201, payload];    

            } else {
                return [200, payload];                
            }
        }

        return [400, { error: "Invalid request" }];
      }

}