import UserModel from "../models/UserModel";
import ChannelModel from "../models/ChannelModal";
import { Request, Response } from "express";
import mongoose from "mongoose";

interface CustomRequest extends Request {
  userId?: string;
}

export const createChannel = async (req: CustomRequest, res: Response) => {
  try {
    const { name, members } = req.body;
    const userId = req.userId;

    const admin = await UserModel.findById(userId);

    if (!admin) {
      return res.status(400).json({ message: "Admin user not found." });
    }

    const validMembers = await UserModel.find({ _id: { $in: members } });

    if (validMembers.length !== members.length) {
      return res
        .status(400)
        .json({ message: "Some members are not valid users." });
    }

    const newChannel = new ChannelModel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();

    return res.status(201).json({ channel: newChannel });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while creating the channel", error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

export const getUserChannels = async (req: CustomRequest, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const channels = await ChannelModel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });
    return res.status(200).json({ channels });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error while fetching all the channel contains current user",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

export const getChannelMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { channelId } = req.params;
    // const channel = await ChannelModel.findById(channelId).populate({
    // path: "Messages",
    // populate: {
    //   path: "sender",
    //   select: "firstName lastName email _id image color",
    // },
    // });
    const channel = await ChannelModel.findById(channelId).populate("messages");
    // path: "Messages",
    // populate: {
    //   path: "sender",
    //   select: "firstName lastName email _id image color",
    // },
    // });

    console.log(channel);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found!" });
    }
    const messages = channel.messages;
    return res.status(200).json({ messages });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error while fetching all the channel contains current user",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};
