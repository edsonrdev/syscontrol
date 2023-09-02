import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import * as yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container } from "./styles";
import { IoHome } from "react-icons/io5";
import SignInIcon from "../../assets/signin.svg";

export const SignIn = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "SysControl | Entrar na Área de Membro";

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
          <div className="signin-title">
            <h2>Entrar na Área de Membro</h2>

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

              <Button type="submit" variant="primary" size="lg">
                Entrar
              </Button>

              <p>
                Ainda não tem conta? Crie uma <Link to="/cadastrar">aqui</Link>!
              </p>
            </form>
          </div>

          <div className="hero-image">
            <img src={SignInIcon} alt="Ícone de dinheiro" />
          </div>
        </div>
      </main>
    </Container>
  );
};
