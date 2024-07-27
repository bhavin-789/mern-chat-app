import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender?: mongoose.Types.ObjectId;
  recipient?: mongoose.Types.ObjectId;
  messageType: "text" | "file";
  content?: string;
  fileUrl?: string;
  timestamp?: Date;
}

const messagesSchema: Schema<IMessage> = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: function (this: IMessage) {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function (this: IMessage) {
      return this.messageType === "file";
    },
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const MessageModel = mongoose.model<IMessage>("Message", messagesSchema);

export default MessageModel;
