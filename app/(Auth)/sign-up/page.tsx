"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { signUpSchema } from "@/validations/sign-up.schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 500);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const watchedUsername = form.watch("username");

  useEffect(() => {
    debounced(watchedUsername);
  }, [watchedUsername, debounced]);

  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (!username) {
        setUsernameMessage("");
        return;
      }

      setIsCheckingUsername(true);

      try {
        const response = await axios.get(
          `/api/check-unique-username?username=${username}`
        );

        setUsernameMessage(response.data.message);
      } catch (error: any) {
        setUsernameMessage(
          error.response?.data?.message ??
            "Unable to verify username."
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUniqueUsername();
  }, [username]);

    async function onSubmit(data: SignUpValues) {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/sign-up", data);

      toast.success(response.data.message);

      form.reset();
      setUsername("");
      setUsernameMessage("");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account 🚀</CardTitle>
          <CardDescription>
            Sign up to start receiving anonymous messages.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="signup-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>

              {/* Username */}

              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Username</FieldLabel>

                    <Input
                      {...field}
                      placeholder="johndoe"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    {!fieldState.invalid && (
                      <p
                        className={`mt-2 text-sm ${
                          usernameMessage.toLowerCase().includes("available")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isCheckingUsername
                          ? "Checking username..."
                          : usernameMessage}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Email */}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

                            {/* Password */}

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>

                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            form="signup-form"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}