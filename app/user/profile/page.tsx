import { Metadata } from "next"
import { auth } from "@/auth"
import { SessionProvider } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileForm from "./profile-form"

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile Settings',
}

const ProfilePage = async () => {
  const session = await auth()


  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto">
        <Card className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <CardHeader className="space-y-4 pb-4 text-center bg-yellow-400 border-b-4 border-black">
            {/* Optional: Add a comic-style banner or image here */}
            <CardTitle className="font-bold tracking-tight">
              <span className="inline-block transform text-3xl text-red-600" style={{ fontFamily: '"Bangers", cursive, sans-serif', textShadow: '2px 2px #000' }}>
                PROFILE SETTINGS
              </span>
            </CardTitle>
            <p className="text-lg font-semibold text-black" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
              Time to fine-tune your hero details!
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {/* Pass only necessary user fields to the client component */}
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </SessionProvider>
  )
}

export default ProfilePage