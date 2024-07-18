import React, {useEffect, useCallback} from 'react'
import { useSocketContext } from '../socketContext/SocketContext'
import { usePeer } from '../socketContext/WebRtcPeerContext';

const CallingRoom = () => {
    const { socket }= useSocketContext();
    const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();

    const handleNewUserJoined = useCallback(async(data) => {
        const {emailId} = data;
        console.log("New First User Joined as - ", emailId);
        const offer = await createOffer();
        socket.emit("call-user", {emailId, offer});
    }, [socket, createOffer]);

    const handleIncommingCall = useCallback( async(data) => {
        const {from, offer} = data;
        const ans = await createAnswer(offer);
        console.log("Incomming call from: ", from, offer);
        socket.emit("call-accepted", {emailId : from, ans})
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
  return (
    <div>
      <h1>Rooom joined</h1>
    </div>
  )
}

export default CallingRoom
