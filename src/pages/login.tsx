import { useActionState, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter,CardHeader, CardTitle } from "@/components/ui/card";
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

        if (username !== "admin" || password !== "password") {
          return { error: "Username or password is incorrect" };
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
    <section className="flex min-h-screen items-center justify-center p-4">
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
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
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
      </Card>
    </section>
  );
};

export default Login;