
import styled from "@emotion/styled";

export default function HomePage() {
  const Container = styled.div`
    display: block;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: var(--gray-000);
  `;

  return (
    <Container>
      <div>Home</div>
    </Container>
  );
}