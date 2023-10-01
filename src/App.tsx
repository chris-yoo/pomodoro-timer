import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { timerState, toggleState } from "./atoms";
import Timer from "./components/Timer";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";
import CountUp from "./components/CountUp";

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

const StyledButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 50px;
  border: none;
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
      <StyledButton
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 1 }}
        onClick={onClick}
      >
        {toggleValue ? <FaPause /> : <FaPlay />}
      </StyledButton>
      <CountUp />
    </Wrapper>
  );
}

export default App;
