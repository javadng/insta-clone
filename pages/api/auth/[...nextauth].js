import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const authOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "userCredential",

      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credential, req) {
        const client = await connectToDatabase();

        const usersCollection = await client.db().collection("users");
        const lowerCaseCredential = credential.username.toLowerCase();

        const user = await usersCollection.findOne({
          username: lowerCaseCredential,
        });

        if (!user) {
          client.close();

          throw new Error("user Not found!");
        }

        const passwordIsValid = await comparePassword(
          credential.password,
          user.hashedPassword
        );

        if (!passwordIsValid) {
          client.close();

          throw new Error("password is not correct");
        }

        client.close();
        return {
          name: user.username,
          email: null,
          image: null,
        };
      },
    }),
  ],
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (!session) return;

  //     const client = await connectToDatabase();

  //     const userAccount = await client
  //       .db()
  //       .collection("users-account")
  //       .findOne({
  //         username: token.name,
  //       });

  //     return {
  //       user: { ...userAccount },
  //       expires: session.expires,
  //     };
  //   },
  // },
};

export default NextAuth(authOptions);
