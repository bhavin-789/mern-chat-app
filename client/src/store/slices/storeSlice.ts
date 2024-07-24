// export const createChatSlice = (set, get) => ({
//   selectedChatType: undefined,
//   selectedChatData: undefined,
//   selectedChatMessages: [],
//   directMessagesContacts: [],
//   isUploading: false,
//   isDownloading: false,
//   fileUploadProgress: 0,
//   fileDownloadProgress: 0,
//   channels: [],
//   setChannels: (channels) => set({ channels }),
//   setIsUploading: (isUploading) => set({ isUploading }),
//   setIsDownloading: (isDownloading) => set({ isDownloading }),
//   setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
//   setFileDownloadProgress: (fileDownloadProgress) =>
//     set({ fileDownloadProgress }),
//   setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectedChatMessages: (selectedChatMessages) =>
//     set({ selectedChatMessages }),
//   setDirectMessagesContacts: (directMessagesContacts) =>
//     set({ directMessagesContacts }),
//   addChannel: (channel) => {
//     const channels = get().channels;
//     set({ channels: [channel, ...channels] });
//   },
//   closeChat: () =>
//     set({
//       selectedChatType: undefined,
//       selectedChatData: undefined,
//       selectedChatMessages: [],
//     }),
//   addMessage: (message) => {
//     const selectedChatMessages = get().selectedChatMessages;
//     const selectedChatType = get().selectedChatType;

//     set({
//       selectedChatMessages: [
//         ...selectedChatMessages,
//         {
//           ...message,
//           recipient:
//             selectedChatType === "channel"
//               ? message.recipient
//               : message.recipient._id,
//           sender:
//             selectedChatType === "channel"
//               ? message.sender
//               : message.sender._id,
//         },
//       ],
//     });
//   },
//   addChannelInChannelList: (message) => {
//     const channels = get().channels;
//     const data = channels.find((channel) => channel._id === message.channelId);
//     const index = channels.findIndex(
//       (channel) => channel._id === message.channelId
//     );
//     if (index !== -1 && index !== undefined) {
//       channels.splice(index, 1);
//       channels.unshift(data);
//     }
//   },
//   addContactsInDMContacts: (message) => {
//     const userId = get().userInfo.id;
//     const fromId =
//       message.sender._id === userId
//         ? message.recipient._id
//         : message.sender._id;
//     const fromData =
//       message.sender._id === userId ? message.recipient : message.sender;
//     const dmContacts = get().directMessagesContacts;
//     const data = dmContacts.find((contact) => contact._id === fromId);
//     const index = dmContacts.findIndex((contact) => contact._id === fromId);
//     if (index !== -1 && index !== undefined) {
//       dmContacts.splice(index, 1);
//       dmContacts.unshift(data);
//     } else {
//       dmContacts.unshift(fromData);
//     }
//     set({ directMessagesContacts: dmContacts });
//   },
// });

import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  color: number;
  image: string;
  profileSetup: boolean;
}

interface StoreState {
  selectedChatType?: any;
  selectedChatData?: any;
  selectedChatMessages: any[];
  directMessagesContacts: any[];
  isUploading: any;
  isDownloading: any;
  fileUploadProgress: any;
  fileDownloadProgress: any;
  channels: any[];
  userInfo: UserInfo | undefined;
}

const initialState: StoreState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  channels: [],
  userInfo: undefined,
};

// export const getMessages = createAsyncThunk(
//   "store/getMessages",
//   async (body: any) => {
//     try {
//       const res = await apiClient.post(GET_ALL_MESSAGES_ROUTE, body, {
//         withCredentials: true,
//       });
//       return res;
//     } catch (error: any) {
//       return error.response.data;
//     }
//   }
// );

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
      state.userInfo = action.payload;
    },
    // setChannels: (channels) => set({ channels }),
    setChannels: (state, action: PayloadAction<any>) => {
      // set({ channels }),
      state.channels = action.payload;
    },

    // setIsUploading: (isUploading) => set({ isUploading }),
    setIsUploading: (state, action: PayloadAction<any>) => {
      state.isUploading = action.payload;
    },
    // setIsDownloading: (isDownloading) => set({ isDownloading }),
    setIsDownloading: (state, action: PayloadAction<any>) => {
      state.isDownloading = action.payload;
    },

    // setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
    setFileUploadProgress: (state, action: PayloadAction<any>) => {
      state.fileUploadProgress = action.payload;
    },

    // setFileDownloadProgress: (fileDownloadProgress) =>
    //   set({ fileDownloadProgress }),
    setFileDownloadProgress: (state, action: PayloadAction<any>) => {
      state.fileDownloadProgress = action.payload;
    },

    // setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatType: (state, action: PayloadAction<any>) => {
      state.selectedChatType = action.payload;
    },

    // setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatData: (state, action: PayloadAction<any>) => {
      state.selectedChatData = action.payload;
    },

    // setSelectedChatMessages: (selectedChatMessages) =>
    //   set({ selectedChatMessages }),
    setSelectedChatMessages: (state, action: PayloadAction<any>) => {
      console.log("action==========>>: ", action);
      // console.log("before: ", state.selectedChatMessages);
      state.selectedChatMessages = action.payload;
      // console.log("after: ", state.selectedChatMessages);
      // state.selectedChatMessages.push(action.payload);
    },

    // setDirectMessagesContacts: (directMessagesContacts) =>
    //   set({ directMessagesContacts }),
    setDirectMessagesContacts: (state, action: PayloadAction<any>) => {
      state.directMessagesContacts = action.payload;
    },

    // addChannel: (channel) => {
    //   const channels = get().channels;
    //   set({ channels: [channel, ...channels] });
    // },
    addChannel: (state, action: PayloadAction<any>) => {
      // const channels = get().channels;
      state.channels.unshift(action.payload);
    },

    // closeChat: () =>
    //   set({
    //     selectedChatType: undefined,
    //     selectedChatData: undefined,
    //     selectedChatMessages: [],
    // }),
    closeChat: (state) => {
      state.selectedChatType = undefined;
      state.selectedChatData = undefined;
      state.selectedChatMessages = [];
    },

    // addMessage: (message) => {
    //   const selectedChatMessages = get().selectedChatMessages;
    //   const selectedChatType = get().selectedChatType;

    //   set({
    //     selectedChatMessages: [
    //       ...selectedChatMessages,
    //       {
    //         ...message,
    //         recipient:
    //           selectedChatType === "channel"
    //             ? message.recipient
    //             : message.recipient._id,
    //         sender:
    //           selectedChatType === "channel"
    //             ? message.sender
    //             : message.sender._id,
    //       },
    //     ],
    //   });
    // },
    addMessage: (state, action: PayloadAction<any>) => {
      // const selectedChatMessages = get().selectedChatMessages;
      const { message } = action.payload;
      const selectedChatType = state.selectedChatType;
      const recipient: any =
        selectedChatType === "channel"
          ? message.recipient
          : message.recipient._id;
      const sender: any =
        selectedChatType === "channel" ? message.sender : message.sender._id;

      state.selectedChatMessages.push({
        ...message,
        recipient,
        sender,
      });
    },

    // addChannelInChannelList: (message) => {
    //   const channels = get().channels;
    //   const data = channels.find(
    //     (channel) => channel._id === message.channelId
    //   );
    //   const index = channels.findIndex(
    //     (channel) => channel._id === message.channelId
    //   );
    //   if (index !== -1 && index !== undefined) {
    //     channels.splice(index, 1);
    //     channels.unshift(data);
    //   }
    // },
    addChannelInChannelList: (state, action: PayloadAction<any>) => {
      // const channels = get().channels;
      const { message } = action.payload;
      const { channels } = state;
      const data = channels.find(
        (channel) => channel._id === message.channelId
      );
      const index = channels.findIndex(
        (channel) => channel._id === message.channelId
      );
      if (index !== -1 && index !== undefined) {
        channels.splice(index, 1);
        channels.unshift(data);
      }
    },

    // addContactsInDMContacts: (message) => {
    //   const userId = get().userInfo.id;
    //   const fromId =
    //     message.sender._id === userId
    //       ? message.recipient._id
    //       : message.sender._id;
    //   const fromData =
    //     message.sender._id === userId ? message.recipient : message.sender;
    //   const dmContacts = get().directMessagesContacts;
    //   const data = dmContacts.find((contact) => contact._id === fromId);
    //   const index = dmContacts.findIndex((contact) => contact._id === fromId);
    //   if (index !== -1 && index !== undefined) {
    //     dmContacts.splice(index, 1);
    //     dmContacts.unshift(data);
    //   } else {
    //     dmContacts.unshift(fromData);
    //   }
    //   set({ directMessagesContacts: dmContacts });
    // },
    addContactsInDMContacts: (state, action: PayloadAction<any>) => {
      // const userId = get().userInfo.id;
      const userId = state?.userInfo?.id;
      const message = action.payload;

      const fromId =
        message.sender._id === userId
          ? message.recipient._id
          : message.sender._id;
      const fromData =
        message.sender._id === userId ? message.recipient : message.sender;
      // const dmContacts = get().directMessagesContacts;
      const { directMessagesContacts } = state;
      const data = directMessagesContacts.find(
        (contact) => contact._id === fromId
      );
      const index = directMessagesContacts.findIndex(
        (contact) => contact._id === fromId
      );
      if (index !== -1 && index !== undefined) {
        directMessagesContacts.splice(index, 1);
        directMessagesContacts.unshift(data);
      } else {
        directMessagesContacts.unshift(fromData);
      }
      // set({ directMessagesContacts: directMessagesContacts });
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getMessages.pending, (state) => {})
  //     .addCase(getMessages.fulfilled, (state, action) => {
  //       console.log("action===", action.payload.data.messages);
  //       state.selectedChatMessages = action.payload.data.messages;
  //     })
  //     .addCase(getMessages.rejected, (state, action) => {});
  // },
});

export const {
  setUserInfo,
  setChannels,
  addContactsInDMContacts,
  addChannelInChannelList,
  addMessage,
  closeChat,
  addChannel,
  setDirectMessagesContacts,
  setSelectedChatMessages,
  setSelectedChatType,
  setFileDownloadProgress,
  setFileUploadProgress,
  setIsDownloading,
  setIsUploading,
  setSelectedChatData,
} = storeSlice.actions;
export default storeSlice.reducer;
