# Video-Call-WebRTC 🔗

A simple, learning-focused WebRTC application built with Node.js and Socket.IO for establishing peer-to-peer video and audio calls directly in the browser. This project is designed to help understand the fundamentals of real-time communication.

## 🎯 Project Purpose
This repository documents my journey of learning and implementing the **WebRTC (Web Real-Time Communication)** protocol. The core goal was to build a functional video/audio calling app to understand signaling, peer connections, and media streaming.

## 🛠️ Tech Stack
- **WebRTC API**: For direct peer-to-peer video/audio streaming.
- **Node.js & Express**: Backend server for the application.
- **Socket.IO**: For real-time signaling between peers (exchanging SDP offers/answers and ICE candidates).
- **HTML, CSS, JavaScript (ES6+)**: Frontend interface and WebRTC logic.

## ✨ Core Features
- **Peer-to-Peer Calls**: Direct browser-to-browser video and audio connections.
- **Real-Time Signaling**: Uses a Socket.IO server to help peers discover and connect.
- **Media Controls**: Toggle video or audio on/off during a call.
- **Clean Call Management**: Start a new call or end the current session.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or above)
- A modern web browser with camera/mic access (Chrome, Firefox, Edge)

### Installation & Running
1.  **Clone and Install**
    ```bash
    git clone https://github.com/chatanyapra/Video-Call-WebRTC.git
    cd Video-Call-WebRTC
    npm install
    ```

2.  **Start the Server**
    ```bash
    node server.js
    # or, if using nodemon for development:
    # nodemon server.js
    ```

3.  **Join a Call**
    - Open `http://localhost:3000` in your browser (allow camera/microphone access).
    - Open the same URL in a **second browser tab or window** (or on another device on the same network).
    - Click **"Start Call"** in one window. The other window should automatically connect, establishing a video call.

## 📁 Key Project Structure
```
Video-Call-WebRTC/
├── public/           # Frontend static files
│   ├── index.html   # Main application page
│   ├── style.css    # Basic styling
│   └── script.js    # WebRTC & Socket.IO client logic
├── server.js        # Node.js / Socket.IO signaling server
├── package.json     # Project dependencies
└── README.md        # This file
```

## 🔧 How It Works (Simplified)
1.  **User Access**: Two users open the web app in their browsers.
2.  **Signaling**: They connect to a common Socket.IO server.
3.  **Offer/Answer**: User A creates a WebRTC offer and sends it via the server to User B, who responds with an answer.
4.  **Network Discovery**: Peers exchange ICE candidates to find the best connection path (via the signaling server).
5.  **Direct Connection**: Once connected, video/audio streams flow **directly** between browsers (P2P).

## 📚 Learning Outcomes
This project was a practical exploration of:
- The **WebRTC API** (`RTCPeerConnection`, `getUserMedia`).
- The critical role of a **signaling server** in establishing connections.
- The **Session Description Protocol (SDP)** and **Interactive Connectivity Establishment (ICE)** framework.
- Managing real-time events and media streams with JavaScript.

## ⚠️ Important Note
This is a **learning project**. The signaling server is minimal and suitable for local or trusted network use. For a production application, you would need to implement robust security, user authentication, a more scalable signaling method, and potentially use STUN/TURN servers for connecting users behind restrictive firewalls (NATs).

## 🔮 Potential Enhancements
- Add text chat alongside the video call.
- Implement "room" functionality for multiple participants (more complex).
- Improve UI/UX with a better design framework.
- Add screen sharing capability.
