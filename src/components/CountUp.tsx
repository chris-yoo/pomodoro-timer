import { useRecoilState } from "recoil";
import { countState } from "../atoms";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span:first-child {
    color: rgba(255, 255, 255, 0.3);
    font-size: 30px;
    font-weight: bolder;
  }
  span:last-child {
    color: white;
    font-size: 30px;
    font-weight: bolder;
  }
`;

function CountUp() {
  const [count, setCount] = useRecoilState(countState);
  const goal = Math.floor(count / 4);
  const round = count % 4;
  return (
    <Wrapper>
      <CountContainer>
        <span>{`${round}/4`}</span>
        <span>ROUND</span>
      </CountContainer>
      <CountContainer>
        <span>{`${goal}/12`}</span>
        <span>GOAL</span>
      </CountContainer>
    </Wrapper>
  );
}

export default CountUp;
