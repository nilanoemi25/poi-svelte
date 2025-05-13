
import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv";
import { poiService } from "$lib/services/poi-service";
import type { User } from "$lib/types/poi-types";

const SECRET_CLIENT_ID = process.env.SECRET_CLIENT_ID; 
const SECRET_CLIENT_SECRET = process.env.SECRET_CLIENT_SECRET; 

export const actions = {
  signup: async ({ request }) => {
    const form = await request.formData();
    const user: User = {
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: form.get("email") as string,
      password: form.get("password") as string
    };
    if (user.email === "" || user.password === "") {
      throw redirect(307, "/");
    } else {
      console.log(`attempting to sign up email: ${user.email} with password: ${user.password}`);
      const success = await poiService.signup(user);
      if (success) {
        throw redirect(303, "/");
      } else {
        throw redirect(307, "/");
      }
    }
  }, 



    OAuth2: async({})=>{
        const redirectURL = 'http://localhost:5173/oauth';

       // console.log('id',SECRET_CLIENT_ID)

        const oAuth2Client = new OAuth2Client(
            SECRET_CLIENT_ID,
            SECRET_CLIENT_SECRET,
            redirectURL
          );
      
          // Generate the url that will be used for the consent dialog.
          const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
            prompt: 'consent'
          });

          throw redirect(302,authorizeUrl);
        } 

    



}; 