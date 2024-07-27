import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "@/store";
import {
  addChannelInChannelList,
  addContactsInDMContacts,
  addMessage,
} from "@/store/slices/storeSlice";

const socketContext = createContext(null);

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useSelector((state: RootState) => state.store);
  const { selectedChatType, selectedChatData } = useSelector(
    (state: RootState) => state.store
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://localhost:8000", {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          dispatch(addMessage(message));
        }
        dispatch(addContactsInDMContacts(message));
      };

      const handleReceiveChannelMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          dispatch(addMessage(message));
        }
        dispatch(addChannelInChannelList(message));
      };

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

      // return () => {
      //   if (socket.current) {
      //     socket.current.disconnect();
      //     console.log("Socket Disconnected!");
      //   }
      // };
    }
  }, [userInfo, selectedChatType, selectedChatData]);

  return (
    <socketContext.Provider value={socket.current}>
      {children}
    </socketContext.Provider>
  );
};
