import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    authToken: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    authTokenExpiresIn: string;
    refreshToken: string;
    phone: string;
    refreshTokenExpiresIn: string;
    cadasturCode?: string;
    profileImageUrl: string;
    authTokenExpirationTime: number;
  }
}
