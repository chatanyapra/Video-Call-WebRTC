import React, {useState} from "react";
import { useSocketContext } from "../socketContext/SocketContext";

const Home = () => {
  const {socket} = useSocketContext();
  const [email, setEmail] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const handleJoinRoom = (event) => {
    event.preventDefault();
    socket.emit("join-room",{roomId: roomNo, emailId: email});
    console.log("email: ", email, " Room: ", roomNo);
  }
  return (
    <div className="home-container">
      <h1>Home</h1>
      <form className="form-container" onSubmit={handleJoinRoom}>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <input value={roomNo} onChange={e => setRoomNo(e.target.value)} type="text" placeholder="Enter Room Code" />
        <button type="submit">Enter Room</button>
      </form>
    </div>
  );
};

export default Home;
