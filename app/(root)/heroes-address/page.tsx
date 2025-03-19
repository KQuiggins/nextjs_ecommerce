import React from 'react'
import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getUserById } from '@/lib/actions/user.actions'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ShippingAddress } from '@/types'
import HeroesAddressForm from './heroes-address-form'

export const metadata: Metadata = {
  title: 'Heroes Address',
  description: 'Please enter your address details below.',
  keywords: 'heroes, address, details',
}


const HeroesAddressPage = async () => {

  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);
  return (
    <>
      <HeroesAddressForm address={user.address as ShippingAddress} />
    </>
  )
}

export default HeroesAddressPage