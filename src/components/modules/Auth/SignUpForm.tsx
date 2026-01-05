import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Rocket } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const registerSchema = z
  .object({
    name: z.string().min(3, { error: "Name is to short" }),
    email: z.email(),
    password: z.string().min(8, { error: "Must be minimum 8 character long" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Must be minimum 8 character long" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "password doest not match",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 3. Define the submit handler
  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Form Data:", data);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-border">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="bg-primary p-2 rounded-lg">
            <Rocket className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Join TourBee today and start your next adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 pt-2">
              <Button type="submit" className="w-full font-semibold">
                Create Account
              </Button>
              <Button variant="outline" type="button" className="w-full">
                Sign up with Google
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
