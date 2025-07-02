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
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import Loader from "./ui/loader"
import { useState } from "react"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = authFormSchema(type);

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      if (type === "sign-up") {
        // Handle sign up logic here
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        })

        if(!result?.success) {
          toast.error(result?.message || "Failed to create an account");
          return;
        }
        
        toast.success("Account created successfully! Please sign in.");
        router.push('/sign-in');
      } else {
        // Handle sign in logic here
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to sign in. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });
        
        toast.success("Signed in successfully!");
        router.push('/');
      }
    } catch (error) {
        console.log(error)
        toast.error(`Error submitting form: ${error}`);

    } finally {
      setLoading(false);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt="logo" height={32} width={38} />
                <h2 className="text-primary-100">MockMate</h2>
            </div>

                <h3>An AI-powered mock interview companion</h3>

                <Form {...form}>
                    <form 
                      onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form"
                    >

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

                      <Button className="btn" type="submit" disabled={loading}>{loading ? <Loader /> : isSignIn ? 'Sign in' : 'Create Account'}</Button>

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