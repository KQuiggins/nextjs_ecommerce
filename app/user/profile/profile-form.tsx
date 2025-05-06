'use client'
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader, ZapIcon } from "lucide-react"
import { z } from "zod"
import { updateUserProfileSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'
import { updateUserProfile } from "@/lib/actions/user.actions"

const ProfileForm = () => {

    const { data: session, update } = useSession()
    const form = useForm<z.infer<typeof updateUserProfileSchema>>({
        resolver: zodResolver(updateUserProfileSchema),
        defaultValues: {
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
        },

    })

    const onSubmit = async (values: z.infer<typeof updateUserProfileSchema>) => {

            const res = await updateUserProfile(values);

            if (!res.success) {
                toast.error(res.message || 'Failed to update profile.');


            }


        const newSession = {
            ...session,
            user: {
                ...session?.user,
                name: values.name,
            },
        };

        await update(newSession);
        toast.success('Hero Identity Updated!');

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    disabled
                                    placeholder='Email'
                                    className='input-field'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-bold">Update Your Hero Identity (Name)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your new hero name"
                                    className="border-2 border-black bg-white/90 p-6 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="group relative w-full overflow-hidden border-2 border-black bg-yellow-400 font-bold text-black transition-transform hover:translate-y-[-2px] hover:bg-yellow-300 active:translate-y-[0px]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {form.formState.isSubmitting ? (
                            <>
                                UPDATING...
                                <Loader className="h-5 w-5 animate-spin" />
                            </>
                        ) : (
                            <>
                                SAVE CHANGES
                                <ZapIcon className="h-5 w-5" />
                            </>
                        )}
                    </span>
                </Button>
            </form>
        </Form>
    )
}

export default ProfileForm