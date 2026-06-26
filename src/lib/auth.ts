import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from './prisma'
import { tanstackStartCookies } from "better-auth/tanstack-start";


// console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);

export const auth = betterAuth({
    
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
//     baseURL: process.env.BETTER_AUTH_URL,
//     emailAndPassword: { 
//     enabled: true, 
//   },  
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    },  
    
    },
    plugins: [tanstackStartCookies()] 
});