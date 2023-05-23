import { useEffect } from "react";

import { Container } from "./styles";

import { Header } from "../../components/Header";

export const CadastrarCliente = () => {
  useEffect(() => {
    document.title = "SysControl | Cadastrar Cliente";

    return () => {
      document.title = "SysControl | Sistema de Controle de Empréstimos";
    };
  });

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <h1 className="page-title">Cadastrar Cliente</h1>
        </div>
      </main>
    </Container>
  );
};
