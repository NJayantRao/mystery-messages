"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const verifyCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be exactly 6 digits"),
});

type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

const VerifyCode = () => {
  const router = useRouter();
  const params = useParams();

  const username = params.username as string;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyCodeValues) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/verify-code", {
        username,
        code: data.code,
      });

      toast.success(response.data.message);

      router.replace("/sign-in");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to verify account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-gray-900">
            Verify your account ✨
          </CardTitle>

          <CardDescription className="text-gray-500">
            Enter the verification code we sent to your email address.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="verify-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Verification Code</FieldLabel>

                    <Input
                      {...field}
                      placeholder="123456"
                      maxLength={6}
                      autoComplete="one-time-code"
                      disabled={isSubmitting}
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
            form="verify-form"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyCode;
