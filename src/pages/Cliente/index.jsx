import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import { Container } from "./styles";
import { api } from "../../services";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { ModalContext } from "../../providers/modal";
import { ParcelasContext } from "../../providers/parcelas";
import { Modal } from "../../components/Modal";
import { toast } from "react-toastify";

// import { api } from "../../services";

export const Cliente = () => {
  const { id } = useParams();
  const history = useHistory();
  const [cliente, setCliente] = useState({});

  const emprestimoRef = useRef(0);
  const parcelaRef = useRef(0);

  // console.log(emprestimoRef.current);

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

    // set;

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
    // console.log(emprestimoRef.current, parcelaRef.current);
    const dadosEmprestimo = {
      clientId: id,
      value: emprestimoRef.current,
      portion: parcelaRef.current,
    };

    // console.log(dadosEmprestimo);

    // api.post("/emprestimos", dadosEmprestimo);
  };

  // console.log(emprestimoRef.current, parcelaRef.current);

  const { showModal, setShowModal } = useContext(ModalContext);

  useEffect(() => {
    api
      .get(`/clientes/${id}`)
      .then((resp) => {
        setCliente(resp.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="search-client-section">
            <h1 className="page-title">Cliente: {cliente.name}</h1>

            <Button variant="primary" onClick={() => setShowModal(true)}>
              Simular Empréstimo
            </Button>
          </div>

          <hr />

          <p>O cliente não possui empréstimos no momento.</p>
        </div>
      </main>

      {showModal && (
        // <ParcelasProvider>
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

            <Button
              variant="primary"
              size="sm"
              onClick={handleSimularEmprestimo}
            >
              Simular
            </Button>
          </div>

          {parcelas.length ? (
            <>
              <hr />
              <table className="resumo-emprestimo">
                <thead>
                  <tr>
                    <th>Parcela</th>
                    <th>Valor restante</th>
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
        // </ParcelasProvider>
      )}
    </Container>
  );
};
