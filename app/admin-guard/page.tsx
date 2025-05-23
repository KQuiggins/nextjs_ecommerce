import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Access Denied | Comic Store',
  description: 'Admin area access restricted',
}

const AdminGuardPage = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-900">
    {/* Background Image */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/images/access_denied.png"
        alt="Restricted Access Background"
        width={150}
        height={150}
        className="w-full h-auto object-contain opacity-50"
        priority
      />
    </div>

    {/* Overlay panel */}
    <div className="relative z-10 text-center space-y-6 p-8 bg-gray-800/70 rounded-lg max-w-md">
      <h1 className="text-4xl font-bold text-white">ACCESS DENIED!</h1>
      <p className="text-lg text-gray-200">
        This area is restricted to Super Admins only. You don’t seem to have the
        special powers needed to access this part of the Comic Store universe.
      </p>
      <Link href="/" className="block">
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-bold bg-blue-700 hover:bg-blue-500 text-white border-2 border-primary/50 shadow-lg"
        >
          Return to Comic Store
        </Button>
      </Link>
    </div>
  </div>
  )
}

export default AdminGuardPage