import styled from 'styled-components';
import { mockVideoSrc2 } from 'assets';

export const RealTimeSensorGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 0px;
  place-items: center center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 2fr 1fr;
`;

export const RealTimeSensorInfo = styled.div<{ invert?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 15px;
  width: 170px;
  height: 180px;
  color: ${(props) => (props.invert ? 'white' : '#5aa7ff')};
  background-color: ${(props) => (!props.invert ? 'white' : '#5aa7ff')};
  font-weight: 700;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
`;

export const BehavioralInfo = styled.div<{ invert?: boolean }>`
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

export const RealTimeSensorName = styled.div`
  padding-left: 15px;
  padding-top: 15px;
  font-size: 20px;
`;

export const RealTimeSensorValue = styled.div`
  place-items: center;
  height: 100%;
  display: grid;
  align-items: center;
  font-size: 42px;
`;

export const VideoBox = styled.video<{ shown?: boolean }>`
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

export const VideoBoxWrapper = styled.div`
  background-color: black;
  position: relative;
  background-position: 0px -200px;
  /* background-image: url(${mockVideoSrc2}); */
  background-color: white;
  background-size: cover;
`;

export const MainWrapper = styled.div`
  /* background-color: gray; */
  height: 100%;
  overflow-y: hidden;
  display: grid;
  grid-gap: 30px;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`;
