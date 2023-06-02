import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";

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
  useEffect(() => {
    api
      .get(`/clientes/${id}`)
      .then((resp) => {
        setCliente(resp.data);
      })
      .catch((err) => console.log(err));
    // console.log(cliente.loans[0]?.portion);
  }, [id]);

  const [input, setInput] = useState(cliente?.loans[0].portion || 0);

  const emprestimoRef = useRef(0);
  const parcelaRef = useRef(0);

  const { parcelas, setParcelas } = useContext(ParcelasContext);

  const handleSimularEmprestimo = () => {
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

  const handleContratarEmprestimo = () => {
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

  const { showModal, setShowModal, typeModal, setTypeModal } =
    useContext(ModalContext);

  const handleClickToPay = () => {
    setTypeModal("toPay");
    setShowModal(true);
  };

  const handleClickToTake = () => {
    setTypeModal("toTake");
    setShowModal(true);
  };

  const handleChangeCheckbox = (e) => {
    setCheckbox(!checkbox);

    if (checkbox) {
      setInput(cliente.loans[0].portion);
    }

    if (!checkbox) {
      setInput("");
      document.querySelector("#payment-amount").value = "";
    }
  };

  const handleToPay = () => {
    console.log(input);
  };

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="search-client-section">
            <h1 className="page-title">Cliente: {cliente.name}</h1>

            {!cliente.loans?.length && (
              <Button
                variant="primary"
                onClick={() => {
                  setTypeModal("loanSimulation");
                  setShowModal(true);
                }}
              >
                Simular Empréstimo
              </Button>
            )}
          </div>

          <hr />

          {!cliente?.loans?.length ? (
            <p>O cliente não possui empréstimos no momento.</p>
          ) : (
            <table className="cliente-loan">
              <thead>
                <tr>
                  <th>Nº da parcela</th>
                  <th>Vencimento</th>
                  <th>Valor da parcela</th>
                  <th>Valor pago</th>
                  <th>Status</th>
                  <th>Valor após pagar</th>
                  <th>Opções</th>
                </tr>
              </thead>

              <tbody>
                {cliente.loans[0]?.movements.map((m, index) => (
                  <tr key={m.id} className={m.status === 3 ? "expired" : ""}>
                    <td>Parcela {index + 1}</td>
                    <td>{convertDate(m.expireDate)}</td>
                    <td>{cliente.loans[0].portion.toFixed(2)}</td>
                    <td>{m.paidValue === 0 ? "---" : m.paidValue}</td>
                    <td>
                      <span
                        className={
                          m.status === 0
                            ? "open"
                            : m.status === 1
                            ? "fullPaid"
                            : m.status === 2
                            ? "partialPaid"
                            : "expired"
                        }
                      >
                        {m.status === 0
                          ? "Em aberto"
                          : m.status === 1
                          ? "Pago total"
                          : m.status === 2
                          ? "Pago parcialmente"
                          : "Em atraso"}
                      </span>
                    </td>
                    <td>
                      {m.previousValue.toFixed(2)} + 10% -{" "}
                      {cliente.loans[0].portion} = {m.remainderValue.toFixed(2)}
                    </td>
                    <td className="options">
                      {m.current ? (
                        m.status === 1 || m.status === 2 ? (
                          <span>---</span>
                        ) : (
                          <>
                            <button
                              className="input"
                              onClick={handleClickToPay}
                            >
                              Pagar
                            </button>
                            {m.status !== 3 && (
                              <>
                                OU{" "}
                                <button
                                  className="output"
                                  onClick={handleClickToTake}
                                >
                                  Pegar
                                </button>
                              </>
                            )}
                          </>
                        )
                      ) : (
                        <span>---</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {showModal && typeModal === "loanSimulation" ? (
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
                onClick={handleSimularEmprestimo}
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
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleContratarEmprestimo}
                >
                  Contratar Empréstimo
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
        </Modal>
      ) : showModal && typeModal === "toPay" ? (
        <Modal title="Realizar pagamento" width="md">
          <div className="form-group">
            <label htmlFor="emprestimo">Tipo de pagamento:</label>
            <input
              type="checkbox"
              id="toggle"
              className="toggle toggle-shadow"
              value={checkbox}
              onChange={(e) => handleChangeCheckbox(e)}
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
      ) : (
        ""
      )}
    </Container>
  );
};
