"use client";

import { useEffect, useState, useCallback } from "react";
import { Copy, RefreshCcw, Link2, Inbox, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import Navbar from "@/components/Navbar";
import MessageCard from "@/components/MessageCard";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Message = {
  _id: string;
  content: string;
  createdAt: string;
};

export default function Dashboard() {
  const { data: session } = useSession();

  const [profileUrl, setProfileUrl] = useState("");
  const [acceptMessages, setAcceptMessages] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTogglingMessages, setIsTogglingMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch accept-messages status
  const fetchAcceptMessagesStatus = useCallback(async () => {
    try {
      const response = await axios.get("/api/accept-messages");
      setAcceptMessages(response.data.isAcceptingMessages);
    } catch {
      toast.error("Failed to fetch message settings.");
    }
  }, []);

  // Fetch messages from inbox
  const fetchMessages = useCallback(async (showToast = false) => {
    try {
      setIsRefreshing(true);
      const response = await axios.get("/api/get-messages");
      setMessages(response.data.messages ?? []);
      if (showToast) toast.success("Inbox refreshed.");
    } catch {
      toast.error("Couldn't refresh messages.");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // On mount / session ready
  useEffect(() => {
    if (!session?.user?.username) return;
    setProfileUrl(`${window.location.origin}/msg/${session.user.username}`);
    fetchAcceptMessagesStatus();
    fetchMessages();
  }, [session, fetchAcceptMessagesStatus, fetchMessages]);

  // Toggle accept-messages via PATCH /api/accept-messages
  const handleToggleAcceptMessages = async (checked: boolean) => {
    try {
      setIsTogglingMessages(true);
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: checked,
      });
      setAcceptMessages(checked);
      toast.success(response.data.message ?? "Settings updated.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to update settings."
      );
      // Revert optimistic update
      setAcceptMessages(!checked);
    } finally {
      setIsTogglingMessages(false);
    }
  };

  // Delete a message via DELETE /api/delete-message/[id]
  const handleDelete = async (messageId: string) => {
    // Optimistic removal
    setMessages((prev) => prev.filter((m) => m._id !== messageId));
    try {
      await axios.delete(`/api/delete-message/${messageId}`);
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete message.");
      // Re-fetch to restore correct state
      fetchMessages();
    }
  };

  const copyProfileUrl = async () => {
    if (!profileUrl) return;
    await navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied to clipboard.");
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="space-y-6 p-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    Public Feedback Profile
                  </h2>
                  {session?.user?.username && (
                    <p className="text-sm text-muted-foreground">
                      @{session.user.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Public Link */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Your Public Link</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={profileUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="icon"
                    onClick={copyProfileUrl}
                    disabled={!profileUrl}
                    className="cursor-pointer"
                  >
                    <Copy className="h-4 w-4 " />
                  </Button>
                </div>
              </div>

              {/* Accept Messages Toggle */}
              <div className="rounded-2xl border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Accept Messages</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Let people send anonymous feedback.
                    </p>
                  </div>
                  <Switch
                    className="cursor-pointer"
                    checked={acceptMessages}
                    onCheckedChange={handleToggleAcceptMessages}
                    disabled={isTogglingMessages}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inbox Section */}
          <div className="space-y-6">
            {/* Inbox Header */}
            <div className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {messages.length === 0
                    ? "No anonymous messages yet."
                    : `${messages.length} anonymous ${
                        messages.length === 1 ? "message" : "messages"
                      } received.`}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => fetchMessages(true)}
                disabled={isRefreshing}
                className="rounded-xl  cursor-pointer"
              >
                <RefreshCcw
                  className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>

            {/* Empty State */}
            {messages.length === 0 ? (
              <Card className="rounded-3xl border-dashed">
                <CardContent className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Inbox className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">No messages yet</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Share your public profile link with friends or on social
                    media. Anonymous messages you receive will automatically
                    appear here.
                  </p>
                  <Button className="mt-8 rounded-xl" onClick={copyProfileUrl}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Public Link
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {messages.map((message) => (
                  <MessageCard
                    key={message._id}
                    messageId={message._id}
                    message={message.content}
                    createdAt={message.createdAt}
                    onMessageDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
