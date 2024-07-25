import { Server as SocketIOServer } from "socket.io";
import MessageModel from "./models/MessagesModel";
import ChannelModel from "./models/ChannelModal";

const setupSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: [process.env.ORIGIN as string],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket: any) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message: any) => {
    console.log("backendContactMessage: ", message);
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await MessageModel.create(message);
    const messageData = await MessageModel.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");
    // .lean()

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    // if (recipientSocketId) {
    //   io.to(recipientSocketId).emit("receiveMessage", {
    //     ...messageData,
    //     selectedChatType: message.selectedChatType,
    //   });
    // }

    if (senderSocketId) {
      // console.log("data", data);
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };
  //   if (senderSocketId) {
  //     // console.log("data", data);
  //     io.to(senderSocketId).emit("receiveMessage", {
  //       ...messageData,
  //       selectedChatType: message.selectedChatType,
  //     });
  //   }
  // };

  const sendChannelMessage = async (message: any) => {
    console.log("message backend: ", message);
    const { channelId, sender, content, messageType, fileUrl } = message;

    const createdMessage = await MessageModel.create({
      sender,
      recipient: null,
      content,
      messageType,
      timestamp: new Date(),
      fileUrl,
    });

    const messageData: any = await MessageModel.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .exec();

    await ChannelModel.findByIdAndUpdate(channelId, {
      $push: { messages: createdMessage._id },
    });

    const channel: any = await ChannelModel.findById(channelId).populate(
      "members"
    );

    const finalData = { ...messageData._doc, channelId: channel._id };

    if (channel && channel.members) {
      channel.members.forEach((member: any) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("receive-channel-message", finalData);
        }
      });
      const adminSocketId = userSocketMap.get(channel.admin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("receive-channel-message", finalData);
      }
    }
  };

  io.on("connection", (socket: any) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket Id: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
