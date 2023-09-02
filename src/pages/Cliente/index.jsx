import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";

import { format } from "date-fns";
import { convertToRealBR } from "../../utils/helpers";

import { Container } from "./styles";
import { api } from "../../services";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { ModalContext } from "../../providers/modal";
import { ParcelasContext } from "../../providers/parcelas";
import { Modal } from "../../components/Modal";
import { toast } from "react-toastify";
import { BsCheckCircleFill } from "react-icons/bs";

import { convertDate } from "../../utils/helpers";

export const Cliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [checkbox, setCheckbox] = useState(false);
  const [input, setInput] = useState(0);
  const emprestimoRef = useRef(0);
  const parcelaRef = useRef(0);
  const { parcelas, setParcelas } = useContext(ParcelasContext);
  const {
    dataModal,
    setDataModal,
    showModal,
    setShowModal,
    typeModal,
    setTypeModal,
    resetModal,
  } = useContext(ModalContext);
  const [successfullyPaidParcel, setSuccessfullyPaidParcel] = useState(false);
  const currentLoan = cliente?.loans?.find((loan) => loan.isCurrent);
  // const loans = cliente?.loans;
  const getClients = () => {
    api
      .get(`/clientes/${id}`)
      .then((resp) => {
        setCliente(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClients();
  }, [id, successfullyPaidParcel]);

  // useEffect(() => {}, [successfullyPaidParcel]);

  useEffect(() => {
    if (!checkbox) {
      if (currentLoan?.length) {
        setDataModal(currentLoan?.portion);
      }
    } else {
      setDataModal("");
    }
  }, [checkbox, currentLoan?.length, currentLoan?.portion, setDataModal]);

  useEffect(() => {
    if (showModal === false) {
      setCheckbox(false);
    }
  }, [showModal]);

  // simulação e contratação de empréstimos
  const handleShowSimulationModal = () => {
    setTypeModal("simulation-modal");
    setShowModal(true);
  };

  const handleLoanSimulation = () => {
    let valorEmprestimo = +document.querySelector("#emprestimo").value;
    let valorParcela = +document.querySelector("#parcela").value;

    if (!valorEmprestimo || !valorParcela) {
      toast.error("Informe os valores do empréstimo!");
      return false;
    }

    emprestimoRef.current = valorEmprestimo;
    parcelaRef.current = valorParcela;

    let valorRestante = 0;
    let linhaParcela = "";
    let arrayParcelas = [];

    while (valorEmprestimo >= valorParcela) {
      valorRestante = valorEmprestimo + valorEmprestimo * 0.1 - valorParcela;

      linhaParcela = `R$ ${valorEmprestimo.toFixed(
        2
      )} + 10% - R$ ${valorParcela.toFixed(2)} = R$ ${valorRestante.toFixed(
        2
      )}`;

      arrayParcelas.push(linhaParcela);

      valorEmprestimo = valorRestante;
    }

    setParcelas([...arrayParcelas]);

    document.querySelector("#emprestimo").value = "";
    document.querySelector("#parcela").value = "";
  };

  const handleHireLoan = () => {
    const dadosEmprestimo = {
      clientId: id,
      value: emprestimoRef.current,
      portion: parcelaRef.current,
    };

    api
      .post("/emprestimos", dadosEmprestimo)
      .then((_) => {
        toast.success("Empréstimo criado com sucesso!");
      })
      .catch((err) => {
        toast.error(`Erro ao criar empréstimo: ${err}`);
      });

    emprestimoRef.current = 0;
    parcelaRef.current = 0;

    setShowModal(false);
  };

  // pagamento de empréstimos
  // const handleShowPayModal = (value) => {
  //   // setDataModal(value);
  //   // setTypeModal("to-pay-modal");
  //   // setShowModal(true);

  // };

  const handleToPay = (p) => {
    const lastParcel = currentLoan?.parcels[currentLoan?.parcels.length - 1];

    const isLastParcel =
      p === currentLoan?.parcels[currentLoan?.parcels.length - 1];

    const data = {
      loanId: currentLoan.id,
      amount: !isLastParcel
        ? +currentLoan?.portion
        : +(lastParcel.previousValue * 1.1).toFixed(2),
    };

    api
      .put("/emprestimos", data)
      .then((resp) => {
        setSuccessfullyPaidParcel(true);
        toast.success("Parcela paga com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  // console.log(
  //   +(
  //     currentLoan?.parcels[currentLoan?.parcels.length - 1].previousValue * 1.1
  //   ).toFixed(2)
  // );

  console.log(cliente);

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="search-client-section">
            <h1 className="page-title">Cliente: {cliente.name}</h1>

            {(!cliente?.loans?.length ||
              cliente?.loans?.every((loan) => loan.finished)) && (
              <Button variant="primary" onClick={handleShowSimulationModal}>
                Simular Empréstimo
              </Button>
            )}
          </div>

          <hr />

          {!cliente?.loans?.length ? (
            <p>Esse cliente ainda não tem empréstimos.</p>
          ) : (
            <>
              {!cliente?.loans?.every((loan) => loan.finished) ? (
                <>
                  <h2 className="paid-loans-title">Empréstimo Corrente</h2>

                  <table className="cliente-loan">
                    <thead>
                      <tr>
                        <th>Parcelas</th>
                        <th>Vencimento</th>
                        <th>Dívida Atual</th>
                        <th>Cálculo da Dívida Restante</th>
                        <th>Valor Pago</th>
                        <th>Opções</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentLoan?.parcels.map((p, index) => (
                        <tr
                          key={p.id}
                          className={p.status === 3 ? "expired" : ""}
                        >
                          <td>
                            {index !== currentLoan?.parcels?.length - 1
                              ? index + 1
                              : "Resto"}
                          </td>
                          <td>{convertDate(p.expireDate)}</td>

                          <td>
                            {convertToRealBR(p.previousValue * 1.1).format()}
                          </td>

                          <td>
                            {index !== currentLoan?.parcels?.length - 1
                              ? `${convertToRealBR(
                                  p.previousValue
                                ).format()} + ${convertToRealBR(
                                  p.previousValue * 0.1
                                ).format()} - ${convertToRealBR(
                                  currentLoan.portion
                                ).format()} = ${convertToRealBR(
                                  p.remainderValue
                                ).format()}`
                              : `${convertToRealBR(
                                  p.previousValue
                                ).format()} + ${convertToRealBR(
                                  p.previousValue * 0.1
                                ).format()} - ${convertToRealBR(
                                  p.previousValue * 1.1
                                ).format()} = ${convertToRealBR(0).format()}`}
                          </td>
                          {/* <td>
                            {index !== currentLoan?.parcels?.length - 1
                              ? convertToRealBR(p.remainderValue).format()
                              : convertToRealBR(0).format()}
                          </td> */}
                          <td>
                            <span
                              className={`${p.paidValue !== 0 && "fullPaid"}`}
                            >
                              {p.paidValue !== 0
                                ? convertToRealBR(p.paidValue).format()
                                : ". . ."}
                            </span>
                          </td>
                          <td className="options">
                            <button
                              className={`input ${
                                !p.isCurrent && "no-current-input"
                              }`}
                              onClick={() => handleToPay(p)}
                              disabled={!p.isCurrent}
                            >
                              Pagar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                ""
              )}

              {cliente?.loans?.some((loan) => loan.finished) && (
                <>
                  <h2 className="paid-loans-title">Empréstimos Pagos</h2>

                  <table className="paid-loans">
                    <thead>
                      <tr>
                        <th>Início</th>
                        <th>Parcela (R$)</th>
                        <th>Emprestado (R$)</th>
                        <th>Recebido (com Juros)</th>
                        <th>Fim</th>
                        <th>Opções</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cliente?.loans
                        ?.filter((loan) => loan.finished)
                        .toReversed()
                        .map((loan) => (
                          <tr key={loan.id}>
                            <td>
                              {format(new Date(loan.createdAt), "dd/LL/yyyy")}
                            </td>
                            <td>{convertToRealBR(loan.portion).format()}</td>
                            <td>{convertToRealBR(loan.value).format()}</td>
                            <td>
                              {convertToRealBR(
                                loan.portion * (loan.parcels?.length - 1) +
                                  loan.parcels[loan.parcels?.length - 1]
                                    .paidValue
                              ).format()}
                            </td>

                            <td>
                              {format(new Date(loan.updatedAt), "dd/LL/yyyy")}
                            </td>
                            <td>
                              <button>Consultar</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {showModal && typeModal === "simulation-modal" && (
        <Modal title="Simular Empréstimo" width="lg">
          <div className="valores-emprestimo">
            <div className="row">
              <div className="form-group">
                <label htmlFor="emprestimo">Empréstimo (R$):</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  id="emprestimo"
                  placeholder="2.000,00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="parcela">Parcela (R$):</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  id="parcela"
                  placeholder="400,00"
                />
              </div>
            </div>

            <div className="form-group">
              <Button
                variant="primary"
                size="sm"
                onClick={handleLoanSimulation}
              >
                Simular
              </Button>

              {emprestimoRef.current && parcelaRef.current ? (
                <div className="loan-values">
                  <p>
                    Empréstimo:{" "}
                    <span>R$ {emprestimoRef.current.toFixed(2)}</span>
                  </p>
                  <p>
                    Parcela: <span>R$ {parcelaRef.current.toFixed(2)}</span>
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {parcelas.length ? (
            <>
              <hr />
              <table className="resumo-emprestimo">
                <thead>
                  <tr>
                    <th>Parcelas</th>
                    <th>Devido após cada parcela</th>
                  </tr>
                </thead>

                <tbody>
                  {parcelas.length
                    ? parcelas.map((parcela, indice) => (
                        <tr key={indice}>
                          <td>Parcela {indice + 1}</td>
                          <td>{parcela}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>

              <div className="rodape">
                <Button variant="primary" size="sm" onClick={handleHireLoan}>
                  Contratar Empréstimo
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
        </Modal>
      )}

      {showModal && typeModal === "to-pay-modal" && (
        <Modal title="Realizar pagamento" width="md">
          <div className="form-group">
            <label htmlFor="emprestimo">Tipo de pagamento:</label>
            <input
              type="checkbox"
              id="toggle"
              className="toggle toggle-shadow"
              value={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
            />
            <label htmlFor="toggle"></label>
          </div>
          <div className="form-group">
            <label htmlFor="payment-amount">Valor (R$):</label>
            <input
              type="number"
              min="1"
              step="0.01"
              id="payment-amount"
              value={dataModal}
              onChange={(e) => setDataModal(e.target.value)}
              disabled={!checkbox}
            />
          </div>
          <div className="form-group">
            <Button
              variant="primary"
              size="md"
              className="btn-to-pay"
              onClick={handleToPay}
            >
              Pagar
            </Button>
          </div>
        </Modal>
      )}
    </Container>
  );
};

// 56894
// 56489
// 7569312
