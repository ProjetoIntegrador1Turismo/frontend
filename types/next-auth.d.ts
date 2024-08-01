import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
        authToken: string;
        firstName: string;
        lastName: string;
        email: string;
        userType: string;
    };
  }
}
