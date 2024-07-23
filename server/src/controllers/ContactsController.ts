import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import MessageModel from "../models/MessagesModel";
import mongoose from "mongoose";

interface CustomRequest extends Request {
  userId?: string;
}

export const searchContacts = async (req: CustomRequest, res: Response) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).json({ message: "searchTerm is required!" });
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");
    const contacts = await UserModel.find({
      $and: [
        { _id: { $ne: req.userId } },
        { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while searching the contacts", error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

export const getContactsForDMList = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    // userId = new mongoose.Types.ObjectId(userId);
    const contacts = await MessageModel.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { recipient: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: {
                $eq: ["$sender", new mongoose.Types.ObjectId(userId)],
              },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: {
            $first: "$timestamp",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: {
          lastMessageTime: -1,
        },
      },
    ]);
    return res.status(200).json({ contacts });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while searching the contacts", error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

export const getAllContacts = async (req: CustomRequest, res: Response) => {
  try {
    const users = await UserModel.find(
      { _id: { $ne: req.userId } },
      "firstName lastName _id email"
    );

    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      value: user._id,
    }));

    return res.status(200).json({ contacts });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while searching the contacts", error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};
