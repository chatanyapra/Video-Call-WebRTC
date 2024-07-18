const express = require('express');
const bodyparser = require('body-parser');
const {server, Server} = require('socket.io');

const io = new Server({
    cors: true,
});
const app = express();

app.use(bodyparser.json())

const emailToSocketMapping = new Map();
io.on("connection", (socket) => {
    console.log("New Connection");
    socket.on("join-room", (data) => {
        const {roomId, emailId} = data;
        console.log("User ", emailId," joined room ", roomId);
        emailToSocketMapping.set(emailId, socket.id);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-joined", {emailId});
    })

});


app.listen(8000, () => {
    console.log('Server running on port 8000');
})
io.listen(8001)