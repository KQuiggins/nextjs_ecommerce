'use client'

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"
import { shippingAddressSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { ShippingAddress } from "@/types"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"
import { updateUserAddress } from "@/lib/actions/user.actions"

const HeroesAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push('/payment-method');
    });
  };

  

  return (
    <>
      <div className="max-w-md mx-auto space-y-4 bg-yellow-50 p-6 border-4 border-red-600 rounded-lg shadow-lg">
        <h1
          className="h2-bold mt-4 text-center"
          style={{
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            color: "#D32F2F",
            textShadow: "2px 2px #FFEB3B",
          }}
        >
          Shipping Address
        </h1>
        <p
          className="text-sm text-muted-foreground text-center"
          style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
        >
          Please enter an address to ship to, hero!
        </p>
        <Form {...form}>
          <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, "fullName">
                }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      style={{
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: "#D32F2F",
                      }}
                    >
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} className="border-2 border-red-600 rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="address"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, "address">
                }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      style={{
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: "#D32F2F",
                      }}
                    >
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} className="border-2 border-red-600 rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="city"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, "city">
                }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      style={{
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: "#D32F2F",
                      }}
                    >
                      City
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} className="border-2 border-red-600 rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="postalCode"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, "postalCode">
                }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      style={{
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: "#D32F2F",
                      }}
                    >
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter postal code" {...field} className="border-2 border-red-600 rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="country"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, "country">
                }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      style={{
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: "#D32F2F",
                      }}
                    >
                      Country
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} className="border-2 border-red-600 rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>

  )
}

export default HeroesAddressForm


