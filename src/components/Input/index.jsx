import { Container } from "./styles";

export const Input = ({ register, name, ...rest }) => {
  return <Container {...register(name)} {...rest} />;
};
