import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
    };
  }
}
