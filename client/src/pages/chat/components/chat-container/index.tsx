import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./components/chat-header";
import MessageBar from "./components/message-bar";
import MessageContainer from "./components/message-container";
import { RootState } from "@/store";
import { useEffect } from "react";
import { getMessages } from "@/store/slices/storeSlice";

const ChatContainer = () => {
  // const { selectedChatType, selectedChatData, selectedChatMessages } =
  //   useSelector((state: RootState) => state.store);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMessages({ id: selectedChatData._id }));
  // }, []);

  return (
    <div className="top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
