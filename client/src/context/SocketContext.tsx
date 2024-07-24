// import { useAppStore } from "@/store";
import { RootState } from "@/store";
import {
  addChannelInChannelList,
  addContactsInDMContacts,
  addMessage,
} from "@/store/slices/storeSlice";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const socketContext = createContext(null);

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  // const { userInfo } = useAppStore();
  const { userInfo } = useSelector((state: RootState) => state.store);
  const { selectedChatType, selectedChatData } = useSelector(
    (state: RootState) => state.store
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        // const {
        //   selectedChatType,
        //   selectedChatData,
        //   addMessage,
        //   addContactsInDMContacts,
        // } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("message received", message);
          dispatch(addMessage(message));
        }
        dispatch(addContactsInDMContacts(message));
      };

      const handleReceiveChannelMessage = (message) => {
        // const {
        //   selectedChatType,
        //   selectedChatData,
        //   addMessage,
        //   addChannelInChannelList,
        // } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
        dispatch(addChannelInChannelList(message));
      };

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <socketContext.Provider value={socket.current}>
      {children}
    </socketContext.Provider>
  );
};
