import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { timerState, toggleState } from "./atoms";
import Timer from "./components/Timer";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 50px;
  color: white;
  font-weight: 900;
`;

function App() {
  const [toggleValue, setToggleValue] = useRecoilState(toggleState);
  const onClick = () => {
    setToggleValue(!toggleValue);
  };

  return (
    <Wrapper>
      <Title>Pomodoro</Title>
      <Timer toggle={toggleValue} />
      <button onClick={onClick}>{toggleValue ? "pause" : "start"}</button>
    </Wrapper>
  );
}

export default App;
