import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";

import { FiDollarSign } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

export const Painel = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "SysControl | Painel Financeiro";

    return () => {
      document.title = "SysControl | Sistema de Controle de Empréstimos";
    };
  });

  return (
    <Container>
      <Header page="painel" />

      <main>
        <div className="container">
          <h1 className="page-title">Painel Financeiro</h1>

          <hr />

          <div className="card-list">
            <Card
              value="R$ 10.000,00"
              title="Total emprestado"
              icon={<FiDollarSign size={18} />}
              color="red"
            />
            <Card
              value="R$ 2.200,00"
              title="Total recebido"
              icon={<FiDollarSign size={18} />}
              color="brand"
            />
            <Card
              value="R$ 9.624,56"
              title="Total a receber (juros)"
              icon={<FiDollarSign size={18} />}
              color="yellow"
            />
            <Card
              value="471"
              title="Carteira de clientes"
              icon={<FiUser size={18} />}
              color="blue"
            />
          </div>
        </div>
      </main>
    </Container>
  );
};
