import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container } from "./styles";
import { IoHome } from "react-icons/io5";
import SignUpIcon from "../../assets/signup.svg";

export const SignUp = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "SysControl | Criar Conta de Usuário";

    return () => {
      document.title = "SysControl | Sistema de Controle de Empréstimos";
    };
  });

  const submitCallback = (data) => console.log(data);

  return (
    <Container>
      <main>
        <div className="container">
          <Button
            variant="primary"
            className="back-to-home"
            onClick={() => history.push("/")}
          >
            <IoHome /> Home
          </Button>

          <div className="signup-title">
            <h2>Criar Conta de Usuário</h2>

            <form onSubmit={handleSubmit(submitCallback)}>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <Input
                  register={register}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu melhor email..."
                />
                <span className="error">{errors.email?.message}</span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <Input
                  register={register}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite uma senha bem segura..."
                />
                <span className="error">{errors.password?.message}</span>
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirmação de senha:</label>
                <Input
                  register={register}
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Digite a senha novamente..."
                />
                <span className="error">{errors.passwordConfirm?.message}</span>
              </div>

              <Button type="submit" variant="primary" size="lg">
                Criar
              </Button>

              <p>
                Já tem sua conta? Faça login <Link to="/entrar">aqui</Link>!
              </p>
            </form>
          </div>

          <div className="hero-image">
            <img src={SignUpIcon} alt="Ícone de dinheiro" />
          </div>
        </div>
      </main>
    </Container>
  );
};
