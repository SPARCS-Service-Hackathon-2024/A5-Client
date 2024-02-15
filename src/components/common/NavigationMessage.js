import styled from "@emotion/styled";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.2rem 1rem;
  border-radius: 1.2rem;
  background-color: var(--gray-000);
  box-shadow: 0.08rem 0.15rem 0.35rem rgba(0, 0, 0, 0.33);
  position: absolute;
  bottom: 7rem;
  z-index: 50;
  width: 86%;
  left: 50%;
  transform: translateX(-50%);
`;

const IndexCircle = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 0.2rem solid var(--pink-600);
  color: var(--pink-600);
  font-size: 1.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DescContainer = styled.div`
  position: relative;
  margin-left: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainDesc = styled.div`
  width: 60%;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--gray-400);
  word-break: keep-all;
`;

const SubDesc = styled.div`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: 300;
  color: var(--gray-400);
`;

const RightArrow = styled.i`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: var(--pink-600);
`;

const TipBox = styled.div`
  margin-top: 1rem;
  font-weight: 300;
  width: 90%;
  text-align: left;
`;

export default function NavigationMessage({
  pos,
  main_desc,
  sub_desc,
  tip,
  current_index,
}) {
  return (
    <Container>
      <DescContainer>
        <IndexCircle>{current_index + 1}</IndexCircle>
        <MainDesc>{main_desc}</MainDesc>
        <SubDesc>{sub_desc}</SubDesc>
        <RightArrow className="fas fa-chevron-right" />
      </DescContainer>
      {tip !== "" && (
        <TipBox>
          Tip:
          <br />
          {tip}
        </TipBox>
      )}
    </Container>
  );
}
