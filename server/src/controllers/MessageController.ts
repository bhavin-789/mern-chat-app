import { Request, Response } from "express";
import MessageModel from "../models/MessagesModel";
import { mkdirSync, renameSync } from "fs";

interface CustomRequest extends Request {
  userId?: string;
}

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;
    if (!user1 || !user2) {
      return res.status(400).json({ message: `Both user ID's are required!` });
    }

    const messages = await MessageModel.find({
      $or: [
        {
          sender: user1,
          recipient: user2,
        },
        {
          sender: user2,
          recipient: user1,
        },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while fetching the all messages", error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

export const uploadFile = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required!" });
    }

    const date = Date.now();
    let fileDir = `uploads/files/${date}`;
    let fileName = `${fileDir}/${req.file.originalname}`;

    mkdirSync(fileDir, { recursive: true });
    renameSync(req.file.path, fileName);

    return res.status(200).json({ filePath: fileName });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while uploading the file", error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};
