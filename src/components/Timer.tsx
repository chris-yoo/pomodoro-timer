import { useRecoilState, useSetRecoilState } from "recoil";
import { countState, timerState, toggleState } from "../atoms";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface TimerProps {
  toggle: boolean;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeContainer = styled(motion.div)`
  margin: 20px;
  width: 150px;
  height: 300px;
  border-radius: 20px;
  background-color: white;
  color: #7c73e6;
  font-size: 100px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconDevider = styled.span`
  font-size: 50px;
  font-weight: bolder;
  color: rgba(255, 255, 255, 0.5);
`;

const timeContainerVariants = {
  start: { scale: 0.7, opacity: 0.5 },
  end: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, type: "spring", bounce: 0.3 },
  },
};

function Timer({ toggle }: TimerProps) {
  const [count, setCount] = useRecoilState(countState);
  const setToggleValue = useSetRecoilState(toggleState);
  const [remainTime, setRemainTime] = useRecoilState(timerState);
  const defaultTime = 1500;
  const [displayMinutes, setDisplayMinutes] = useState(
    String(Math.floor(remainTime / 60)).padStart(2, "0")
  );
  const [displaySeconds, setDisplaySeconds] = useState(
    String(remainTime % 60).padStart(2, "0")
  );

  useEffect(() => {
    let intervalId: any;

    if (toggle === true) {
      intervalId = setInterval(() => {
        setRemainTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(intervalId);
            setCount((prev) => prev + 1);
            return defaultTime;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [toggle, setRemainTime, defaultTime, setCount]);

  useEffect(() => {
    if (remainTime <= 0) {
      setToggleValue(false);
      setRemainTime(1500);
      setCount((prev) => {
        if (prev === 47) {
          return 0;
        } else {
        }
        return prev + 1;
      });
    }
  }, [remainTime, defaultTime, setRemainTime, setToggleValue]);

  useEffect(() => {
    // remainTime이 변경될 때마다 표시되는 시간을 업데이트
    setDisplayMinutes(String(Math.floor(remainTime / 60)).padStart(2, "0"));
    setDisplaySeconds(String(remainTime % 60).padStart(2, "0"));
  }, [remainTime]);

  return (
    <Wrapper>
      <TimeContainer
        key={displayMinutes}
        variants={timeContainerVariants}
        initial="start"
        animate="end"
        exit="start"
      >
        {displayMinutes}
      </TimeContainer>
      <IconDevider>:</IconDevider>
      <TimeContainer
        key={displaySeconds}
        variants={timeContainerVariants}
        initial="start"
        animate="end"
        exit="start"
      >
        {displaySeconds}
      </TimeContainer>
    </Wrapper>
  );
}

export default Timer;
