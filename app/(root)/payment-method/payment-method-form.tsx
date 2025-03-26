'use client'
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useTransition } from 'react'
import { paymentMethodSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { updateUserPaymentMethod } from '@/lib/actions/user.actions'

const PaymentMethodForm = ({ preferredPaymentMethod }: { preferredPaymentMethod: string | null }) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
          type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
        },
      });
    
      const [isPending, startTransition] = useTransition();
    
      const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
        startTransition(async () => {
          const res = await updateUserPaymentMethod(values);
    
          if (!res.success) {
            toast({
              variant: 'destructive',
              description: res.message,
            });
            return;
          }
    
          router.push('/place-order');
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
                    Payment Method
                </h1>
                <p
                    className="text-sm text-muted-foreground text-center"
                    style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                    Please enter your payment info, hero!
                </p>
                <Form {...form}>
                    <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem className='space-y-3'>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                className='flex flex-col space-y-2'
                                                
                                            >
                                                {PAYMENT_METHODS.map((paymentMethod) => (
                                                    <FormItem
                                                        key={paymentMethod}
                                                        className='flex items-center space-x-3 space-y-0'
                                                    >
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={paymentMethod}
                                                                checked={field.value === paymentMethod}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='font-normal'>
                                                            {paymentMethod}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
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

export default PaymentMethodForm