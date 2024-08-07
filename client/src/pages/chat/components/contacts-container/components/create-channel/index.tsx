import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import {
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACTS_ROUTE,
} from "@/utils/constants";
// import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multiselect";
import { useDispatch } from "react-redux";
import { addChannel } from "@/store/slices/storeSlice";

const CreateChannel = () => {
  // const { setSelectedChatType, setSelectedChatData, addChannel } =
  //   useAppStore();
  const dispatch = useDispatch();

  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.contacts.length > 0) {
        setAllContacts(response.data.contacts);
      }
    };
    if (!allContacts.length) {
      getData();
    }
  }, []);

  const creteChannel = async () => {
    try {
      if (!!channelName.length && !!selectedContacts.length) {
        const response = await apiClient.post(
          CREATE_CHANNEL_ROUTE,
          {
            name: channelName,
            members: selectedContacts.map((contact) => contact.value),
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setChannelName("");
          setSelectedContacts([]);
          setNewChannelModal(false);
          dispatch(addChannel(response.data.channel));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error during creating channel", error.message);
      }
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setNewChannelModal(true)}
              className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for new Channel.
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={allContacts}
              placeholder="Select Contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-grey-600">
                  No results found.
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={creteChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
