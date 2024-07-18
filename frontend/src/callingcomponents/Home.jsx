import React, {useState, useEffect, useCallback} from "react";
import { useSocketContext } from "../socketContext/SocketContext";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const {socket} = useSocketContext();
  const [email, setEmail] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const navigate = useNavigate();
  // submit room----------
  const handleJoinRoom = (event) => {
    event.preventDefault();
    socket.emit("join-room",{roomId: roomNo, emailId: email});
  }

  // room joined by user--------
  const handleJoinedRoom = useCallback(({roomId}) => {
    navigate(`/room/${roomId}`);
  }, [navigate]);
  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    }
  }, [socket,handleJoinedRoom])
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
