import { useActionState, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth.store";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [state, submitAction, isPending] = useActionState(
    async (_: { error: string | null }, formData: FormData) => {
      try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
          return { error: "Please enter both username and password" };
        }

        const { login } = useAuthStore.getState();
        login(
          username,
          "rasOol",
          "Tayjanov", 
          { url: "", id: "" } 
        );
        return { error: null };
      } catch {
        return { error: "Login failed. Please try again." };
      }
    },
    { error: null }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (state.error === null && useAuthStore.getState().isAuthenticated()) {
      navigate("/");
    }
  }, [state, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your username and password to access your account</CardDescription>
      </CardHeader>
      <form action={submitAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        </CardContent>
        <CardFooter className="mt-4">
          <Button
            type="submit"
            className="w-full bg-primary"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </CardFooter>
      </form>
      <div className="px-8 pb-6 text-center">
        <span className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700"
          >
            Sign up
          </a>
        </span>
      </div>
    </Card>
  </div>
  )
}

export default Login
