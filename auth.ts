import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          // If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, trigger, user }: any) {
      // Set the user ID from the token
      session.user.id = token.sub

      session.user.role = token.role
      session.user.name = token.name





      // If there is an update, set the user name
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
    async jwt({ token, user, session, trigger }: any) {
      // Set the user ID from the user
      if (user) {
        token.id = user.id
        token.role = user.role

        // If user has no name, use email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split('@')[0]

          // Update database to reflect the change
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name }
          })
        }

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get('sessionCartId')?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessionCart) {
              // Delete current user cart
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              // Assign new cart
              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }
      return token
    },
    authorized({ request, auth }: any) {

      // Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {

        // Generate new session cart cookie
        const sessionCartId = crypto.randomUUID()
        console.log('sessionCartId', sessionCartId)

        // clone the rquest headers
        const newRequestHeaders = new Headers(request.headers)

        // Crate a new response and add the headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders
          }
        })

        // Set newly generated session cart cookie in the response
        response.cookies.set('sessionCartId', sessionCartId)
        
        return response;

      } else {
        return true;
      }
    },
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)