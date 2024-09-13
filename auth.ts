import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      if (trigger === 'signIn') {
        return {
          ...token,
          ...user,
          authTokenExpirationTime: Date.now() + +user.authTokenExpiresIn * 1000
        };
      } else if (Date.now() < token.authTokenExpirationTime) {
        return token;
      } else {
        try {
          const refreshResponse = await fetch(
            `http://localhost:8081/auth/refresh?refreshToken=${token.refreshToken}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          const TokenOrError = await refreshResponse.json();
          token.authToken = TokenOrError.authToken;
          token.refreshToken = TokenOrError.refreshToken;
          token.authTokenExpiresIn = TokenOrError.authTokenExpiresIn;
          token.refreshTokenExpiresIn = TokenOrError.refreshTokenExpiresIn;
          return token;
        } catch (error) {
          await signOut({ redirectTo: '/login' });
          return token;
        }
      }
    },
    async session({ token, session }) {
      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }
      // eslint-disable-next-line prettier/prettier
      // not ideal, thanks next auth v5 :(

      session.user = token;
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const authResponse = await fetch('http://localhost:8081/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: email,
              password: password
            })
          });

          if (!authResponse.ok) {
            return null;
          }
          const user = await authResponse.json();
          return user;
        }
        return null;
      }
    })
  ]
});
