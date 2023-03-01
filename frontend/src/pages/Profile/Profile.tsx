import { useSensorsMeasurementsData } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import { ISensorMeasurement } from 'types';
import { getWsMessageValidator, useSocket } from 'utils';
import { mockVideoSrc2 } from 'assets';

export function Profile() {
  const { isSuccess, sensorMeasurements } = useSensorsMeasurementsData({});
  const { refOfVideoElement } = useVideo();

  // eslint-disable-next-line no-console
  if (isSuccess) console.log('sensorMeasurements: ', sensorMeasurements);

  if (!isSuccess || !sensorMeasurements) return <div>wait</div>;
  const tempMeasurements = sensorMeasurements.filter(
    ({ sensorCodeName }) => sensorCodeName === 'Temp',
  );
  const o2Measurements = sensorMeasurements
    .filter(({ sensorCodeName }) => sensorCodeName === 'O2')
    .map((meauserement) => ({
      ...meauserement,
      value: meauserement.value * 100,
    }));

  return (
    <MainWrapper>
      <VideoBoxWrapper>
        <VideoBox autoPlay playsInline ref={refOfVideoElement} />
      </VideoBoxWrapper>
      <SuperPlot
        title="Кислород (%)"
        measurementsByOneSensor={o2Measurements}
        color="blue"
        // min={80}
        // max={120}
      />
      <LiveSensors />
      <SuperPlot
        title="Температура (°C)"
        color="red"
        // min={19}
        // max={20}
        measurementsByOneSensor={tempMeasurements}
      />
    </MainWrapper>
  );
}

function LiveSensors() {
  const { getLatestMeasurementsFor, setNewLatestMeasurements } =
    useLatestMeasurements();

  useSocket({
    namespace: '/sensorMeasurement',
    handlers: {
      many: (messages) =>
        setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
      latest: (messages) =>
        setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
      one: (message) =>
        setNewLatestMeasurements([validateAndTransformMeasurement(message)]),
    },
  });

  return (
    <RealTimeSensorGrid>
      <RealTimeSensorInfo invert>
        <RealTimeSensorName>t, °C</RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat(
            (getLatestMeasurementsFor('Temp')?.value || 0).toFixed(2),
          )}
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <RealTimeSensorInfo>
        <RealTimeSensorName>
          O<sub>2</sub>
        </RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat(
            ((getLatestMeasurementsFor('O2')?.value || 0) * 100).toFixed(2),
          )}
          %
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <RealTimeSensorInfo invert>
        <RealTimeSensorName>Ph</RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat((getLatestMeasurementsFor('pH')?.value || 0).toFixed(3))}
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <RealTimeSensorInfo invert>
        <RealTimeSensorName>Ph</RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat((getLatestMeasurementsFor('pH')?.value || 0).toFixed(3))}
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <BehavioralInfo>
        Тип поведения: {getLatestMeasurementsFor('behavior')?.value || 'Норма'}
      </BehavioralInfo>
    </RealTimeSensorGrid>
  );
}

function SuperPlot({
  measurementsByOneSensor,
  title,
  color,
  min,
  max,
}: {
  measurementsByOneSensor: any;
  title: any;
  color: any;
  min?: number;
  max?: number;
}) {
  const dates = measurementsByOneSensor.map(({ date }) => date);
  const datesNumbers = dates.map((e) => e.getTime());
  const maxDate = new Date(Math.max(...datesNumbers));
  const minDate = new Date(Math.min(...datesNumbers));
  const values = measurementsByOneSensor.map(({ value }) => parseFloat(value));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  return (
    <Plot
      data={[
        {
          type: 'scatter',
          mode: 'lines',
          name: 'AAPL High',
          x: dates,
          y: values,
          // line: { color: '#17BECF' },
          marker: { color },
        },
      ]}
      layout={{
        title,
        xaxis: {
          // autorange: true,
          range: [minDate, maxDate],
          rangeselector: {
            buttons: [
              {
                count: 1,
                label: '1s',
                step: 'second',
                stepmode: 'backward',
              },
              {
                count: 6,
                label: '6s',
                step: 'second',
                stepmode: 'backward',
              },
              { step: 'all' },
            ],
          },
          rangeslider: { range: [minDate, maxDate] },
          type: 'date',
        },
        yaxis: {
          // autorange: true,
          range: [min || minValue, max || maxValue],
          type: 'linear',
        },
      }}
    />
  );
}

const validateAndTransformMeasurement =
  getWsMessageValidator(ISensorMeasurement);

const RealTimeSensorGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 20px;
  place-items: center center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 2fr 1fr;
`;

const RealTimeSensorInfo = styled.div<{ invert?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 15px;
  width: 140px;
  height: 180px;
  color: ${(props) => (props.invert ? 'white' : '#5aa7ff')};
  background-color: ${(props) => (!props.invert ? 'white' : '#5aa7ff')};
  font-weight: 700;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
`;

const BehavioralInfo = styled.div<{ invert?: boolean }>`
  display: grid;
  place-items: center;
  border-radius: 15px;
  width: 500px;
  height: 60px;
  grid-column: 1 / -1;
  font-size: 26px;
  color: ${(props) => (props.invert ? 'white' : '#5aa7ff')};
  background-color: ${(props) => (!props.invert ? 'white' : '#5aa7ff')};
  font-weight: 700;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
`;

const RealTimeSensorName = styled.div`
  padding-left: 15px;
  padding-top: 15px;
  font-size: 20px;
`;

const RealTimeSensorValue = styled.div`
  place-items: center;
  height: 100%;
  display: grid;
  align-items: center;
  font-size: 42px;
`;

const VideoBox = styled.video<{ shown?: boolean }>`
  background-color: black;
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  display: ${({ shown }) => (shown ? 'block' : 'none')};
  /* margin: 0% auto; */
`;

const VideoBoxWrapper = styled.div`
  background-color: black;
  position: relative;
  background-position: 0px -200px;
  background-image: url(${mockVideoSrc2});
  background-size: cover;
`;

function useLatestMeasurements() {
  const [latestMeasurements, setLatestMeasurementsState] = useState<
    Map<string, ISensorMeasurement>
  >(new Map());

  return {
    getLatestMeasurementsFor(sensorName: string) {
      return latestMeasurements.get(sensorName);
    },
    setNewLatestMeasurements(candidates: ISensorMeasurement[]) {
      let hasChanged = false;
      candidates.forEach((v) => {
        const currentLatestDate = latestMeasurements.get(
          v.sensorCodeName,
        )?.date;
        console.log(currentLatestDate, v.date);
        // eslint-disable-next-line prettier/prettier
        if (!currentLatestDate || (currentLatestDate < v.date)) {
          latestMeasurements.set(v.sensorCodeName, v);
          hasChanged = true;
        }
      });
      if (hasChanged) {
        setLatestMeasurementsState(new Map(latestMeasurements));
      }
    },
  };
}

const MainWrapper = styled.div`
  /* background-color: gray; */
  height: 100%;
  overflow-y: hidden;
  display: grid;
  grid-gap: 30px;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`;

export function useVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const { dc, pc } = initPeerConnectionAndDataChannel(ref);
    void startDataStream({ pc, refOfVideoElement: ref });
    return getStopper({ dc, pc, refOfVideoElement: ref });
  }, []);

  return { refOfVideoElement: ref };
}

const getStopper = ({ pc, dc, refOfVideoElement }) =>
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

async function startDataStream({ pc, refOfVideoElement }) {
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

function initPeerConnectionAndDataChannel(refOfVideoElement) {
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
