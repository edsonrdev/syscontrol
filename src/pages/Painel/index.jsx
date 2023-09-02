import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";

import { FiDollarSign } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { api } from "../../services";
import { convertToRealBR } from "../../utils/helpers";
import { toast } from "react-toastify";

export const Painel = () => {
  const history = useHistory();

  // state que armazena os dados de todos os clientes
  const [clientes, setClientes] = useState([]);

  // total emprestado a todos os clientes
  const loannedTotal = clientes
    .filter((c) => c.loans.length)
    .reduce(
      (sum, client) =>
        sum + client.loans.reduce((s, loan) => s + loan.value, 0),
      0
    );

  // total recebido (incluindo juros) de todos os clientes
  const receivedTotal = clientes
    .filter((c) => c.loans?.length)
    .reduce(
      (sum, c) =>
        sum +
        c.loans.reduce(
          (sum, loan) =>
            sum + loan.parcels.reduce((s, parcel) => s + parcel.paidValue, 0),
          0
        ),
      0
    );

  // total recebido (incluindo juros) de todos os clientes
  const toReceiveTotal = 0;

  const getClientes = async () => {
    try {
      const { data } = await api.get("/clientes");
      setClientes(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

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
              value={convertToRealBR(loannedTotal).format()}
              title="Emprestado"
              icon={<FiDollarSign size={18} />}
              color="red"
            />
            <Card
              value={convertToRealBR(receivedTotal).format()}
              title="Recebido (com Juros)"
              icon={<FiDollarSign size={18} />}
              color="brand"
            />
            <Card
              value={convertToRealBR(toReceiveTotal).format()}
              title="A receber(com Juros)"
              icon={<FiDollarSign size={18} />}
              color="yellow"
            />
            <Card
              value={clientes.length}
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
