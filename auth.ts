import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { AdapterUser } from 'next-auth/adapters';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      // eslint-disable-next-line prettier/prettier
      // not ideal, thanks next auth v5 :(
      session.user = token as unknown as AdapterUser;
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
