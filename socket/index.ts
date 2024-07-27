import { Server } from "socket.io";

const io = new Server(8800, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserInd)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log(`User Connected: {newUserID} with socket id: ${socket.id}`);
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", (socket) => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected: ", socket.id);

    io.emit("get-users", activeUsers);
  });
    
    socket.on("send-message", () => { 
        
    })
});
