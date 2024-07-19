import React, {useEffect, useCallback, useState} from 'react'
import { useSocketContext } from '../socketContext/SocketContext'
import { usePeer } from '../socketContext/WebRtcPeerContext';
import ReactPlayer from "react-player";

const CallingRoom = () => {
    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState('');
    const { socket }= useSocketContext();
    const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();

    const handleNewUserJoined = useCallback(async(data) => {
        const {emailId} = data;
        console.log("New First User Joined as - ", emailId);
        const offer = await createOffer();
        socket.emit("call-user", {emailId, offer});
        setRemoteEmailId(emailId)
    }, [socket, createOffer]);

    const handleIncommingCall = useCallback( async(data) => {
        const {from, offer} = data;
        const ans = await createAnswer(offer);
        console.log("Incomming call from: ", from, offer);
        socket.emit("call-accepted", {emailId : from, ans})
        // setRemoteEmailId(from)
    }, [createAnswer, socket])

    const handleCallAccepted = useCallback(async(data) => {
        const {ans} = data;
        await setRemoteAns(ans);
        console.log("Call accepted: ", ans);
    },[setRemoteAns])

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incomming-call", handleIncommingCall);
        socket.on("call-accepted", handleCallAccepted);
        return () => {
            socket.off("user-joined", handleNewUserJoined);
            socket.off("incomming-call", handleIncommingCall);
            socket.off("call-accepted", handleCallAccepted);
        }
    }, [handleNewUserJoined,socket])

    // ----user stream video-------------
    const getUserMediaStream = useCallback(async() => {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
      setMyStream(stream);
    },[])
    useEffect(() => {
      getUserMediaStream();
    },[getUserMediaStream]);
//  Negotiation needed by reconnect the user---------------
    const handleNegosiation = useCallback(() => {
      const localOffer = peer.localDescription;
      socket.emit("call-user", {emailId: remoteEmailId, offer: localOffer});
    },[peer.localDescription, remoteEmailId, socket])
    useEffect(() => {
      peer.addEventListener("negotiationneeded", handleNegosiation);
      return () => {
        peer.removeEventListener("negotiationneeded", handleNegosiation);
      }
    }, []);
  return (
    <div>
      <h1>Rooom joined</h1>
      <h2>You are connected to <b>{remoteEmailId}</b></h2>
      <button onClick={() => sendStream(myStream)}>Send Video</button>
      <ReactPlayer url={myStream} playing />
      <ReactPlayer url={remoteStream} playing />
    </div>
  )
}

export default CallingRoom
