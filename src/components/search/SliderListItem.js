import styled from "styled-components";

const ListContainer = styled.div`
  border: 1px solid red;
  cursor: pointer;
  padding: 2rem;
  font-size: 12px;
`;

const SliderListItem = ({ data }) => {
  return <ListContainer>{data.title}</ListContainer>;
};
export default SliderListItem;
