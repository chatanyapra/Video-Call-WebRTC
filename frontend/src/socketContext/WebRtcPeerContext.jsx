import { createContext, useMemo, useContext, useEffect, useCallback, useState } from "react";

const WebRtcPeerContext = createContext();

export const usePeer = () => {
    const context = useContext(WebRtcPeerContext);
    if (context === undefined) {
        throw new Error('usePeer must be used within a WebRtcPeerContext');
    }
    return context;
}

export const PeerProvider = (props) => {
    const [remoteStream, setRemoteStream] = useState(null);
    const peer = useMemo(() => 
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                }
            ]
        })
    ,[])
    const createOffer = async() => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }
    const createAnswer = async(offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const setRemoteAns = async(ans) => {
        await peer.setRemoteDescription(ans);
    }

    const sendStream = async(stream) => {
        const tracks = stream.getTracks();
        for(const track of tracks){
            peer.addTrack(track, stream);
        }
    };

    const handleTrackEvents = useCallback((ev) => {
        const stream = ev.streams;
        setRemoteStream(stream[0]);
    },[setRemoteStream])
    useEffect(() => {
        peer.addEventListener('track', handleTrackEvents);
        return () => {
            peer.removeEventListener('track', handleTrackEvents); 
        }
    },[peer, handleTrackEvents])
    return(
        <WebRtcPeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream}}>
            {props.children}
        </WebRtcPeerContext.Provider>
    )
}
