const IceServers = {
  iceServers: [
    {
      urls: "stun:stun.services.mozilla.com"
    },
    {
      urls: "stun:stun.l.google.com:19302"
    },
    {
      urls: "stun:sip1.lakedestiny.cordiaip.com"
    },
    {
      urls: "stun:stun1.voiceeclipse.net"
    }
  ]
};

const peerConnections: any = {};

export async function JoinEventHandler(socketId: string, stream: MediaStream, socket: SocketIOClient.Socket) {
  console.log(`${socketId} joined`);
  const peerConnection = new RTCPeerConnection(IceServers);
  peerConnections[socketId] = peerConnection;

  stream.getTracks().forEach((track) => {
    
    peerConnection.addTrack(track, stream)
  });

  try {
    const sdp = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
    await peerConnection.setLocalDescription(new RTCSessionDescription(sdp));
    socket.emit('offer', socketId, peerConnection.localDescription);

    peerConnection.ontrack = (e) => {
      console.log(`${socketId} ontrack join`);
      addVideo(e, socketId);
    }
  
    peerConnection.onicecandidate = (e) => {
      if(e.candidate) {
        console.log(`${socketId} onicecandidate`);
        socket.emit('candidate', socketId, e.candidate);
      }
    }

  } catch (err) {
    console.error(err)
  } 
}

export async function OfferEventHandler(socketId: string, data: RTCSessionDescription, stream: MediaStream, socket: SocketIOClient.Socket) {
  console.log(`${socketId} offer..`);

  const peerConnection = new RTCPeerConnection(IceServers);
  peerConnections[socketId] = peerConnection;

  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

  try {
    await peerConnection.setRemoteDescription(data);
    const sdp = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(sdp);

    socket.emit('answer', socketId, peerConnection.localDescription);

    peerConnection.ontrack = (e) => {
      console.log(`${socketId} ontrack offer`);   
      addVideo(e, socketId);
    }
  
    peerConnection.onicecandidate = (e) => {
      if(e.candidate) {
        console.log(`${socketId} onicecandidate..`);
        socket.emit('candidate', socketId, e.candidate);
      }
    }
  } catch (err) {
    console.error(err)
  } 
}

export async function AnswerEventHandler(socketId: string, data: RTCSessionDescription) {
  console.log(`${socketId} answer..`);

  peerConnections[socketId]
    .setRemoteDescription(data)
    .catch((err: any) => console.log(err));
}

export async function CandidateEventHandler(socketId: string, data: RTCIceCandidate) {
  console.log(`${socketId} candidate..`);

  peerConnections[socketId]
    .addIceCandidate(new RTCIceCandidate(data))
    .catch((err: any) => console.error(err))
}

export async function LeaveEventHandler(socketId: string, socket: SocketIOClient.Socket) {
  console.log(`${socketId} leave...`);

  if(socketId === socket.id) {
    Object.keys(peerConnections).forEach(key => removeVideo(key));
  } else {
    removeVideo(socketId);
  }
}


function addVideo(e: RTCTrackEvent, remoteId: string) {
  if(document.getElementById(remoteId)) return;

  const remoteVideo = document.createElement('video');
  remoteVideo.setAttribute('id', remoteId);
  remoteVideo.srcObject = e.streams[0];
  remoteVideo.autoplay = true;
  remoteVideo.setAttribute('playsinline', 'true');
  remoteVideo.play();

  document.getElementById('videos')?.appendChild(remoteVideo);
}

function removeVideo(remoteId: string) {
  peerConnections[remoteId] && peerConnections[remoteId].close();

  delete peerConnections[remoteId];

  if(document.getElementById(remoteId)) {
    document.getElementById(remoteId)?.remove();
  }
}
