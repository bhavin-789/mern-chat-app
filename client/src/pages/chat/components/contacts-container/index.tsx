import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import {
  GET_DM_CONTACTS_ROUTE,
  GET_USER_CHANNEL_ROUTE,
} from "@/utils/constants";
// import { useAppStore } from "@/store";
import ContactList from "@/components/ContactList";
import CreateChannel from "./components/create-channel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setChannels,
  setDirectMessagesContacts,
} from "@/store/slices/storeSlice";
import { Link } from "react-router-dom";

const ContactsContainer = () => {
  // const {
  //   setDirectMessagesContacts,
  //   directMessagesContacts,
  //   channels,
  //   setChannels,
  // } = useAppStore();
  const { directMessagesContacts, channels } = useSelector(
    (state: RootState) => state.store
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      if (response.data.contacts.length > 0) {
        dispatch(setDirectMessagesContacts(response.data.contacts));
      }
    };
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNEL_ROUTE, {
        withCredentials: true,
      });
      if (response.data.channels.length > 0) {
        dispatch(setChannels(response.data.channels));
      }
    };
    if (!directMessagesContacts.length) {
      getContacts();
    }

    if (!channels.length) {
      getChannels();
    }
  }, []);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex item-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="max-h-38vh overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex item-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="max-h-38vh overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <div className="my-5">
        <Link
          to="/accordion-pagination"
          className="flex item-center justify-between pr-10"
        >
          <Title text="Accordion Pagination" />
        </Link>
      </div>
      <div className="my-5">
        <Link
          to="/accordion-infinite-scrolling"
          className="flex item-center justify-between pr-10"
        >
          <Title text="Accordion Infinite Scrolling" />
        </Link>
      </div>
      <div className="my-5">
        <Link
          to="/kanban-drag-and-drop"
          className="flex item-center justify-between pr-10"
        >
          <Title text="Kanban Drag&Drop" />
        </Link>
      </div>
      <div className="my-5">
        <Link
          to="/file-folder"
          className="flex item-center justify-between pr-10"
        >
          <Title text="File and Folder" />
        </Link>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold ">Syncronus</span>
    </div>
  );
};

const Title = ({ text }: { text: string }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
