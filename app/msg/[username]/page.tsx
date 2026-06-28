"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Send, Sparkles, RefreshCcw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { messagesSchema } from "@/validations/messages.schema";
import { SUGGESTIONS } from "@/data/suggestions";

type MessageForm = z.infer<typeof messagesSchema>;

export default function SendMessagePage() {
  const { username } = useParams<{ username: string }>();

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [suggestionSet, setSuggestionSet] = useState(0);
  const [isRefreshingSuggestions, setIsRefreshingSuggestions] = useState(false);

  const form = useForm<MessageForm>({
    resolver: zodResolver(messagesSchema),
    defaultValues: { content: "" },
  });

  // ── Submit ────────────────────────────────────────────────────
  async function onSubmit(data: MessageForm) {
    try {
      setIsSending(true);
      await axios.post("/api/send-messages", {
        username,
        content: data.content,
      });
      setIsSent(true);
      form.reset();
      toast.success("Message sent anonymously!");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 403) {
        toast.error("This user is not accepting messages right now.");
      } else if (axiosError.response?.status === 404) {
        toast.error("User not found.");
      } else {
        toast.error(
          axiosError.response?.data?.message ?? "Failed to send message."
        );
      }
    } finally {
      setIsSending(false);
    }
  }

  // ── Suggestions ───────────────────────────────────────────────
  const refreshSuggestions = () => {
    setIsRefreshingSuggestions(true);
    setTimeout(() => {
      setSuggestionSet((prev) => (prev + 1) % SUGGESTIONS.length);
      setIsRefreshingSuggestions(false);
    }, 400);
  };

  const fillSuggestion = (text: string) => {
    form.setValue("content", text, { shouldValidate: true });
    setIsSent(false);
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* ── Header ── */}
        <div className="space-y-1 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Send a message to <span className="text-primary">@{username}</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Your identity stays completely hidden. Be honest, be kind.
          </p>
        </div>

        {/* ── Success Banner ── */}
        {isSent && (
          <Card className="rounded-2xl border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Send className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Message sent successfully!
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Want to send another? Just type below.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Message Form ── */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Anonymous Message</CardTitle>
          </CardHeader>

          <CardContent>
            <form id="send-message-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Your Message</FieldLabel>

                      <Textarea
                        {...field}
                        placeholder={`Write something honest for @${username}...`}
                        aria-invalid={fieldState.invalid}
                        className="min-h-[140px] resize-none"
                        onChange={(e) => {
                          field.onChange(e);
                          setIsSent(false);
                        }}
                      />

                      <div className="flex items-center justify-between">
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : (
                          <span />
                        )}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {field.value.length}/300
                        </span>
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Button
          type="submit"
          form="send-message-form"
          className="w-full cursor-pointer"
          disabled={isSending}
        >
          <Send className="mr-2 h-4 w-4" />
          {isSending ? "Sending..." : "Send Anonymously"}
        </Button>

        {/* ── Suggestions ── */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Need inspiration?</CardTitle>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={refreshSuggestions}
                disabled={isRefreshingSuggestions}
                className="h-8 rounded-xl text-xs"
              >
                <RefreshCcw
                  className={`mr-1.5 h-3.5 w-3.5 ${
                    isRefreshingSuggestions ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Click any suggestion to fill it in.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {SUGGESTIONS[suggestionSet].map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillSuggestion(suggestion)}
                className="w-full rounded-2xl border bg-muted/40 px-4 py-3 text-left text-sm transition-colors hover:bg-muted hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {suggestion}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* ── Footer ── */}
        <p className="text-center text-xs text-muted-foreground">
          Messages are 100% anonymous. The recipient cannot see who sent this.
        </p>
      </div>
    </main>
  );
}
