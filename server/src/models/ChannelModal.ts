import mongoose, { Document, Schema, Model } from "mongoose";

interface IChannel extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
  messages: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const channelSchema: Schema<IChannel> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

channelSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

channelSchema.pre<IChannel>("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const ChannelModel: Model<IChannel> = mongoose.model<IChannel>("Channel", channelSchema);

export default ChannelModel;
