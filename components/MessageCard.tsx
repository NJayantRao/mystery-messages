"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

type MessageCardProps = {
  messageId: string;
  message: string;
  createdAt: string;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({
  messageId,
  message,
  onMessageDelete,
}: MessageCardProps) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-message/${messageId}`);

      toast.success(response.data.message);

      onMessageDelete(messageId);
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to delete message.");
    }
  };
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Anonymous Message</CardTitle>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className=" cursor-pointer"
            >
              <Trash2 className="h-4 w-4 " />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this message?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. The anonymous message will be
                permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent>
        <p className="leading-7 text-muted-foreground whitespace-pre-wrap">
          {message}
        </p>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
