import { Container } from "./styles";

export const Card = ({ title, icon, value, color }) => {
  return (
    <Container color={color}>
      <h2>{title}</h2>
      <span className="icon">{icon}</span>
      <span className="value">{value}</span>
    </Container>
  );
};
