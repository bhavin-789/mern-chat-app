import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <Toaster closeButton />
      </SocketProvider>
    </Provider>
  </>
);
