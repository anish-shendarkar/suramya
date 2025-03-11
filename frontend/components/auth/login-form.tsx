// ...............................................................

"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Toast } from "@/components/ui/toast"

import Cookies from "js-cookie";

const token = Cookies.get("token");
const loginRole = Cookies.get("role");

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const formSchema = z.object({
    email: z.string().email(),
    // password: z.string(),
    password: z.string().min(5),
  });

  useEffect(() => {
    if (token) {
      if (loginRole === "admin") {
        router.push("/admin/dashboard");
      } else if (loginRole === "user") {
        router.push("/");
        // router.push("/educator/profile");
      } else {
        console.log("User already logged in! but role is not defined");
      }
    }
  }, [token, loginRole, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    console.log("Form submitted!", values);

    try {
      const loginResponse = await fetch("http://localhost:3333/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await loginResponse.json();
      console.log(data);

      if (loginResponse.ok) {
        Cookies.set("token", data.token);
        Cookies.set("role", data.role);
        router.push("/");
        // router.push("/educator/profile");
      } else {
        console.error("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Card className="w-full max-w-[25rem] mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password?.message?.toString()}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => router.push("/auth/signup")}
          >
            Don't have an account? Sign Up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

// // ...............................................................

// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // import { Toast } from "@/components/ui/toast"

// import Cookie from "js-cookie";

// const loginSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
// });

// export function LoginForm() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = React.useState(false);

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof loginSchema>) {
//     try {
//       const response = await fetch(`http://localhost:3333/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         Cookie.set("auth-token", data.token);
//         Cookie.set("role", data.role);
//         // Toast({
//         //     title: "Logged in successfully!",
//         //     description: "Welcome back!",
//         // })
//         // router.push("/educator");
//         router.push("/learner/dashboard");
//       } else {
//         throw new Error("Login failed");
//       }
//     } catch (error) {
//       console.error(error);
//       // Toast({
//       //     variant: "destructive",
//       //     title: "Error",
//       //     description: "There was a problem logging in. Please try again.",
//       // })
//     }
//   }

//   return (
//     <Card className="w-full max-w-[25rem] mx-auto">
//       <CardHeader>
//         <CardTitle>Login</CardTitle>
//         <CardDescription>
//           Enter your credentials to access your account
//         </CardDescription>
//       </CardHeader>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" {...form.register("email")} />
//             {form.formState.errors.email && (
//               <p className="text-sm text-red-500">
//                 {form.formState.errors.email.message}
//               </p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 {...form.register("password")}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4" />
//                 ) : (
//                   <Eye className="h-4 w-4" />
//                 )}
//               </Button>
//             </div>
//             {form.formState.errors.password && (
//               <p className="text-sm text-red-500">
//                 {form.formState.errors.password.message}
//               </p>
//             )}
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//           <Button
//             type="button"
//             variant="link"
//             className="w-full"
//             onClick={() => router.push("/auth/signup")}
//           >
//             Don't have an account? Sign Up
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }
