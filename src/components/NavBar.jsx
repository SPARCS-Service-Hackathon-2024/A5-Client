
import styled from "@emotion/styled";

export default function NavBar() {
  // A navbar layout
  const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    background-color: var(--gray-000);
  `;

  return (
    <Container>
      <div>Home</div>
      <div>About</div>
      <div>Contact</div>
    </Container>
  );
}