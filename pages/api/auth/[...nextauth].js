import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import OktaProvider from "next-auth/providers/okta";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    /**
     * @link https://next-auth.js.org/providers/google
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    /**
     * @link https://next-auth.js.org/providers/okta
     */
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      issuer: process.env.OKTA_ISSUER,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      // If user is authenticated, redirect to baseUrl
      return baseUrl;
    },
  },
});
