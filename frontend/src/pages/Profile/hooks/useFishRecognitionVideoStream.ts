import { useEffect, useRef } from 'react';
import {
  getStopper,
  initPeerConnectionAndDataChannel,
  startDataStream,
} from '../tools';

export function useFishRecognitionVideoStream() {
  const ref = useRef(null);

  useEffect(() => {
    const { dc, pc } = initPeerConnectionAndDataChannel(ref);
    void startDataStream({ pc, refOfVideoElement: ref });
    return getStopper({ dc, pc, refOfVideoElement: ref });
  }, []);

  return { refOfVideoElement: ref };
}
