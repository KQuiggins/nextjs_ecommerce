import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"



import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { APP_NAME } from "@/lib/constants"
import SignUpForm from "./sign-up-form"

export const metadata: Metadata = {
    title: "Sign Up",
}



const SignUpPage = async (props: {
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


                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
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
                            <span className="inline-block transform text-3xl text-primary">{"Create a heroes account"}</span>
                        </CardTitle>

                    </CardHeader>
                    <CardContent>
                        <div className="relative">

                            <SignUpForm />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignUpPage

