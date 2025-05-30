"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "signup" ? z.string().min(3, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type)

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (type === "signup") {
        // Handle sign up logic here
        console.log("Signing up with values:", values);
        toast.success("Account created successfully!");
      } else {
        // Handle sign in logic here
        console.log("Signing in with values:", values);
        toast.success("Signed in successfully!");
      }
    } catch (error) {
        console.log(error)
        toast.error(`Error submitting form: ${error}`);

    }
  }

  const isSignIn = type === "signin";

  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt="logo" height={32} width={38} />
                <h2 className="text-primary-100">MockMate</h2>
            </div>

                <h3>An AI-powered mock interview companion</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">

                      {!isSignIn && (
                        <FormField 
                          control={form.control} 
                          name="name" 
                          label="Name" 
                          placeholder="Enter your name" 
                        />
                      )}
                      
                      <FormField 
                        control={form.control} 
                        name="email" 
                        label="Email" 
                        placeholder="Enter your email"
                        type="email"
                      />

                      <FormField 
                        control={form.control} 
                        name="password" 
                        label="Password" 
                        placeholder="Enter your password" 
                        type="password"
                      />

                      <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create Account'}</Button>

                    </form>

                    <p className="text-center">
                      {isSignIn ? 'No account yet?' : 'Have an account already?'}
                      <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-black text-user-primary ml-1">
                        {!isSignIn ? 'Sign in' : 'Sign up'}
                      </Link>
                    </p>
                </Form>        
        </div>
    </div>
  )
}

export default AuthForm