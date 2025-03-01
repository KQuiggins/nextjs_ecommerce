"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import { useSearchParams } from "next/navigation"
import { ZapIcon } from "lucide-react"
import { signUpUser } from "@/lib/actions/user.actions"
import { signUpDefaultValues } from "@/lib/constants"

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const SignUpButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending}
        className="group relative w-full overflow-hidden border-2 border-black bg-yellow-400 font-bold text-black transition-transform hover:translate-y-[-2px] hover:bg-yellow-300 active:translate-y-[0px]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {pending ? (
            "POWERING UP..."
          ) : (
            <>
              SIGN UP
              <ZapIcon className="h-5 w-5 animate-pulse" />
            </>
          )}
        </span>
      </Button>
    )
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-bold">
            Heroes Identity (Name)
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
            className="border-2 border-black bg-white/90 p-6 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg font-bold">
            Secret Identity (Email)
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
            className="border-2 border-black bg-white/90 p-6 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-lg font-bold">
            Power Word (Password)
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
            className="border-2 border-black bg-white/90 p-6 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-lg font-bold">
            Confirm Power Word (Confirm Password)
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
            className="border-2 border-black bg-white/90 p-6 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div className="pt-2">
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="rounded-md border-2 border-red-500 bg-red-100 p-3 text-center font-bold text-red-700">
            {data.message}
          </div>
        )}

        <div className="text-center text-lg">
          {"Existing Hero? "}
          <Link
            href="/sign-in"
            target="_self"
            className="font-bold text-primary underline decoration-wavy decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
          >
            Enter the realm
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm

