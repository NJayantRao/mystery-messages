import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

export const MessageSchema: Schema<Message> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const MessageModel =
  (mongoose.models.Messages as mongoose.Model<Message>) ||
  mongoose.model<Message>("Messages", MessageSchema);
