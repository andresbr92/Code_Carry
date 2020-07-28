import React, { useEffect, useState, useRef } from 'react'

import io from "socket.io-client"
import Peer from "simple-peer"
import styled from "styled-components"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

const Video = styled.video`
  width: 50%;
  height: 50%;
`;

function VideoChat(props) {
    const [yourID, setYourID] = useState("")
    const [users, setUsers] = useState({})
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const useForceUpdate = () => useState()[1];
    const roomID = props.match.params.video_id





    const userVideo = useRef()
    const partnerVideo = useRef()
    const socket = useRef()

    useEffect(() => {
        socket.current = io.connect("http://localhost:5000")
        socket.current.emit("join room", roomID);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("yourID", (id) => {
            setYourID(id)
            console.log(id)
        })
        socket.current.on("allUsers", (users) => {
            console.log(users)
            setUsers(users)
        })

        socket.current.on("hey", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setCallerSignal(data.signal)
        })
    }, []);

    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {},
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }
    const forceUpdate = useForceUpdate();

    
    

    let UserVideo;
    if (stream) {
        UserVideo = (
            <Video playsInline muted ref={userVideo} autoPlay />
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <Video playsInline ref={partnerVideo} autoPlay />
        );
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
            <div>
                <h3>Llamada entrante </h3>
                <Button className="botton green" onClick={acceptCall}>Accept</Button>
            </div>
        )
    }



    return (

        <Container>
            
            <Row>
                <Col>
                    {users && <Button className="botton green" onClick={() => callPeer(users)}> Iniciar Llamada </Button>} 
                </Col>
                <Col>
                    {incomingCall}
                </Col>
            </Row>
            <Row>
                <Col>
                    {UserVideo}
                    {PartnerVideo}
                </Col>
            </Row>
        </Container>
    );
}

export default VideoChat;