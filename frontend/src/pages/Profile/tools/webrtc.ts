export const getStopper = ({ pc, dc, refOfVideoElement }) =>
  function stop() {
    if (refOfVideoElement.current?.style) {
      // eslint-disable-next-line no-param-reassign
      refOfVideoElement.current.style.display = 'none';
    }
    // close data channel
    if (dc) dc.close();

    // close transceivers
    if (pc.getTransceivers) {
      for (const transceiver of pc.getTransceivers()) {
        if (transceiver.stop) transceiver.stop();
      }
    }

    // close local audio / video
    for (const sender of pc.getSenders()) {
      sender.track.stop();
    }

    // close peer connection
    setTimeout(() => {
      pc.close();
    }, 500);
  };

export async function startDataStream({ pc, refOfVideoElement }) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
    await pc.setLocalDescription(await pc.createOffer());
    await new Promise<void>((resolve) => {
      if (pc.iceGatheringState === 'complete') {
        resolve();
      } else {
        const checkState = () => {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', checkState);
            resolve();
          }
        };
        pc.addEventListener('icegatheringstatechange', checkState);
      }
    });

    const response = await fetch('/rtc/offer', {
      body: JSON.stringify({
        sdp: pc.localDescription.sdp,
        type: pc.localDescription.type,
        video_transform: 'none',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    await pc.setRemoteDescription(await response.json());
    if (refOfVideoElement.current?.style) {
      // eslint-disable-next-line no-param-reassign
      refOfVideoElement.current.style.display = 'block';
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

export function initPeerConnectionAndDataChannel(refOfVideoElement) {
  const pc = new RTCPeerConnection();

  // connect audio / video
  pc.addEventListener('track', (evt) => {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    refOfVideoElement.current.srcObject = evt.streams[0];
    // // eslint-disable-next-line no-param-reassign
    // refOfVideoElement.current.style.display = 'block';
  });

  const ref = { dcInterval: null as any, timeStart: null as any };

  function currentStamp() {
    if (ref.timeStart === null) {
      ref.timeStart = new Date().getTime();
      return 0;
    }
    return new Date().getTime() - ref.timeStart;
  }

  const dc = pc.createDataChannel('chat', { ordered: true });
  dc.onclose = () => {
    clearInterval(ref.dcInterval);
  };
  dc.onopen = () => {
    ref.dcInterval = setInterval(() => {
      const message = `ping ${currentStamp()}`;
      dc.send(message);
    }, 1000);
  };
  return { pc, dc };
}
