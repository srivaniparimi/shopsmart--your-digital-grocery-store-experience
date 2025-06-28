import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email"],
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Login = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onLoginSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Login form submitted:", data);
    
    try {
      // Validate that required fields are filled
      if (loginMethod === "email" && !data.email) {
        throw new Error("Email is required");
      }
      if (loginMethod === "phone" && !data.phone) {
        throw new Error("Phone is required");
      }
      if (!data.password) {
        throw new Error("Password is required");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: "Welcome back to ShopSmart",
      });
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive"
      });
    }
  };

  const onSignUpSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Sign up form submitted:", data);
    
    try {
      // Validate required fields
      if (!data.name || !data.email || !data.password || !data.confirmPassword) {
        throw new Error("All fields are required");
      }
      if (!data.acceptTerms) {
        throw new Error("You must accept the terms and conditions");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      toast({
        title: "Account Created!",
        description: "Your ShopSmart account has been created successfully",
      });
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
    toast({
      title: `${provider} Login`,
      description: `${provider} login integration coming soon!`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 text-center">
              <h1 className="text-2xl font-bold mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-blue-100">
                {isSignUp 
                  ? "Join millions of happy customers" 
                  : "Sign in to your ShopSmart account"
                }
              </p>
            </div>

            {/* Forms */}
            <div className="p-6">
              {!isSignUp ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    {/* Login Method Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setLoginMethod("email")}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          loginMethod === "email"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600"
                        }`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod("phone")}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          loginMethod === "phone"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600"
                        }`}
                      >
                        Phone
                      </button>
                    </div>

                    {/* Email/Phone Input */}
                    <FormField
                      control={loginForm.control}
                      name={loginMethod === "email" ? "email" : "phone"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {loginMethod === "email" ? "Email Address" : "Phone Number"}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {loginMethod === "email" ? (
                                  <Mail className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Phone className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <Input
                                type={loginMethod === "email" ? "email" : "tel"}
                                placeholder={
                                  loginMethod === "email" 
                                    ? "Enter your email" 
                                    : "Enter your phone number"
                                }
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Input */}
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-12"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Forgot Password */}
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                    {/* Name Input */}
                    <FormField
                      control={signUpForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Input */}
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Input */}
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-12"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Input */}
                    <FormField
                      control={signUpForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pl-10 pr-12"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Terms and Conditions */}
                    <FormField
                      control={signUpForm.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-600">
                              I accept the{" "}
                              <Link to="/terms" className="text-blue-600 hover:underline">
                                Terms & Conditions
                              </Link>{" "}
                              and{" "}
                              <Link to="/privacy" className="text-blue-600 hover:underline">
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              )}

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleSocialLogin("Google")}
                  >
                    <span className="text-lg mr-2">🔍</span>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleSocialLogin("Facebook")}
                  >
                    <span className="text-lg mr-2">📘</span>
                    Facebook
                  </Button>
                </div>
              </div>

              {/* Toggle Sign Up/Login */}
              <div className="mt-6 text-center">
                <span className="text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-blue-600 hover:underline font-semibold"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
