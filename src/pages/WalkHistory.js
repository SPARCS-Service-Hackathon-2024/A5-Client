import { useState } from "react";
import HistoryItem from "../components/search/HistoryItem";
import { useEffect } from "react";
import aroundWalkPath from "../dummyData/aroundWalkPath.json";
import { ReactComponent as NoWay } from "../assets/no_way.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NoWayContainer = styled.div`
  padding: 1rem 0;
  > div:last-child {
    margin-top: 1rem;
  }
`;

const HistoryWrapper = styled.div`
  > div:last-child {
    margin-top: 5rem;
    background-color: var(--pink-100);
  }
`;

const MyHistoryTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--gray-500);
  background-color: var(--gray-000);
  padding: 1.8rem 0;
  border-bottom: 0.2rem solid var(--gray-100);
  position: fixed;
  width: 100vw;
  top: 0;
`;

const BackButton = styled.i`
  position: absolute;
  top: 1.8rem;
  left: 1.8rem;
  font-size: 1.8rem;
  color: var(--gray-200);
  touch-action: none;
  background-color: var(--gray-000);
`;

const WalkHistory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setData(aroundWalkPath.promenades);
    console.log("data is ", data);
  }, []);

  return (
    <HistoryWrapper>
      <MyHistoryTitle>
        <BackButton
          className="fas fa-chevron-left"
          onClick={() => navigate(-1)}
        />
        프로필 수정
      </MyHistoryTitle>
      <div>
        {data.length === 0 ? (
          <NoWayContainer>
            <NoWay />
            <div>
              아직 산책을 한 적이 없습니다.
              <br />
              마음에 드는 산책로로 산책을 시작해보세요!
            </div>
          </NoWayContainer>
        ) : (
          data.map((el) => <HistoryItem data={el} key={el.id} />)
        )}
      </div>
    </HistoryWrapper>
  );
};
export default WalkHistory;
