import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./socketContext/SocketContext.jsx";
import { PeerProvider } from "./socketContext/WebRtcPeerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <PeerProvider>
          <App />
        </PeerProvider>
      </SocketContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
