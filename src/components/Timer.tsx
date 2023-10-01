import { useRecoilState, useSetRecoilState } from "recoil";
import { countState, timerState, toggleState } from "../atoms";
import { useEffect } from "react";

interface TimerProps {
  toggle: boolean;
}

function Timer({ toggle }: TimerProps) {
  const [count, setCount] = useRecoilState(countState);
  const setToggleValue = useSetRecoilState(toggleState);
  const [remainTime, setRemainTime] = useRecoilState(timerState);
  const defaultTime = 10;
  const minutes = String(Math.floor(remainTime / 60)).padStart(2, "0");
  const seconds = String(remainTime % 60).padStart(2, "0");

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
  }, [toggle, setRemainTime, defaultTime]);

  useEffect(() => {
    if (remainTime <= 0) {
      setToggleValue(false);
      setRemainTime(10);
      setCount((prev) => prev + 1);
    }
  }, [remainTime, defaultTime, setRemainTime, setToggleValue]);

  return <>{`${minutes}:${seconds}`}</>;
}

export default Timer;
