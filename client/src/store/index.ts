// import { create } from "zustand";
// import { createAuthSlice } from "./slices/authSlice";
// import { createChatSlice } from "./slices/chatSlice";

// export const useAppStore = create()((...a) => ({
//   ...createAuthSlice(...a),
//   ...createChatSlice(...a),
// }));

import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import storeReducer from "./slices/storeSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    store: storeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
