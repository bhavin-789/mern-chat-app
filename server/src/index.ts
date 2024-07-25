import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnection";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes";
import contatRoutes from "./routes/ContactRoutes";
import setupSocket from "./socket";
import messsageRoutes from "./routes/MessageRoutes";
import channelRoutes from "./routes/ChannelRoutes";
import accordionRoutes from "./routes/AccordionRoutes";
const app = express();
const port = process.env.PORT || 8001;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.ORIGIN as string],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contatRoutes);
app.use("/api/messages", messsageRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/accordions", accordionRoutes);

const server = app.listen(port, () => {
  console.log(`⚙️ Server is running at http://localhost:${port}`);
});

setupSocket(server);
