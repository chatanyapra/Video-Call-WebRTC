const express = require('express');
const bodyparser = require('body-parser');
const {server, Server} = require('socket.io');

const io = new Server({
    cors: true,
});
const app = express();

app.use(bodyparser.json())

const emailToSocketMapping = new Map();
const socketToemailMapping = new Map();
io.on("connection", (socket) => {
    console.log("New Connection");
    socket.on("join-room", (data) => {
        const {roomId, emailId} = data;
        console.log("User ", emailId," joined room ", roomId);
        emailToSocketMapping.set(emailId, socket.id);
        socketToemailMapping.set(socket.id, emailId);
        socket.join(roomId);
        socket.emit("joined-room", {roomId})
        socket.broadcast.to(roomId).emit("user-joined", {emailId});
    })
    
    socket.on("call-user", (data) => {
        const {emailId, offer} = data;
        const fromEmail = socketToemailMapping.get(socket.id);
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit("incomming-call", {from: fromEmail, offer})
    });

    socket.on("call-accepted", (data) => {
        const {emailId, ans} = data;
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit("call-accepted", {ans});
    })
});


app.listen(8000, () => {
    console.log('Server running on port 8000');
})
io.listen(8001)