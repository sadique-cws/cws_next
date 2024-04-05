import User from "@/models/userModels";
import { connectDB } from "@/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

async function login(credentials) {
    try {
        connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("Wrong credentials");

        const isCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrect) throw new Error("Wrong credentials");
        return user;

    } catch (error) {
        console.error("Error while login:", error.message);
        throw new Error("Failed to login");
    }
}

async function createUserIfNotExist(token) {
    await connectDB();
    let user = await User.findOne({ email:token.email });
    if (!user) {
        user = await new User({ email:token.email, name:token.name }).save();
    }
    return user;
}

export const authOptions = {
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    console.log("User logged in:", user);
                    return user;
                } catch (error) {
                    console.error("Failed to login:", error.message);
                    throw new Error("Failed to login");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {


        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.email = user.email;
                // Add any other user data you want to include in the token
                // Create user if not exist

                const newUser = await createUserIfNotExist(token);
                token.id = newUser._id;
                token.role  = newUser.role;
                console.log("this is token elseif " , token);

                // Add any other user data you want to include in the token
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username,
                    session.user.email = token.email,
                    session.user.id = token.id,
                    session.role = token.role
            }
            // console.log("this is the session = ", session)
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };