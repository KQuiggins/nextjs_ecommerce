import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import CredentialsSignInForm from "./credentials-signin-form"

import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { APP_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Sign In to Comic Store",
}



const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth()

  if (session) {
    return redirect(callbackUrl || "/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-700 p-4 md:p-6 lg:p-8">
      <div className="relative mx-auto max-w-md">
        {/* Comic-style decorative elements */}
        <div className="absolute -left-4 -top-4 h-20 w-20 rotate-12 bg-yellow-400 opacity-50" />
        <div className="absolute -right-4 -bottom-4 h-20 w-20 -rotate-12 bg-red-500 opacity-50" />

        <Card className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="space-y-4 pb-4">
            <Link href="/" className="mx-auto block w-32 transform transition-transform hover:scale-105">
              <Image
                src="/images/logo.svg"
                width={100}
                height={100}
                alt={`${APP_NAME} logo`}
                priority={true}
                className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
            </Link>
            <CardTitle className="text-center font-bold tracking-tight">
              <span className="inline-block transform text-3xl text-primary">{"WELCOME BACK, HERO!"}</span>
            </CardTitle>
            <CardDescription className="text-center text-lg">{"Your next adventure awaits"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Comic-style speech bubble effect */}
              <div className="absolute -left-3 -right-3 -top-3 -z-10 h-[calc(100%+24px)] rounded-lg border-2 border-black bg-white" />
              <CredentialsSignInForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage

