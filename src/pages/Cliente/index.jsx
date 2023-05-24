import { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import { Container } from "./styles";
import { api } from "../../services";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { ModalContext } from "../../providers/modal";
import { Modal } from "../../components/Modal";

// import { api } from "../../services";

export const Cliente = () => {
  const { id } = useParams();
  const history = useHistory();
  const [cliente, setCliente] = useState({});

  const {
    showModal,
    setShowModal,
    typeModal,
    setTypeModal,
    entityModal,
    setEntityModal,
    resetModal,
  } = useContext(ModalContext);

  useEffect(() => {
    api
      .get(`/clients/${id}`)
      .then((resp) => {
        setCliente(resp.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSimularEmprestimo = () => {
    const valorEmprestimo = +document.querySelector("#emprestimo").value;
    const valorParcela = +document.querySelector("#parcela").value;

    if (valorEmprestimo && valorParcela) {
    }
    // console.log(typeof valorEmprestimo, typeof valorParcela);
    // setEntityModal({});
    // setTypeModal("simularEmprestimo");
    // setShowModal(true);
  };

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

            {/* <div className="form-group"> */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleSimularEmprestimo}
            >
              Simular
            </Button>
            {/* </div> */}
          </div>

          {/* <hr /> */}

          <table className="resumo-emprestimo">
            <thead>
              <tr>
                <th>Parcela</th>
                <th>Valor restante</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Parcela 1</td>
                <td>R$ 2000,00 + R$ 200,00 - R$ 400,00 = R$ 1800,00</td>
              </tr>
              <tr>
                <td>Parcela 2</td>
                <td>R$ 1800,00 + R$ 180,00 - R$ 400,00 = R$ 1580,00</td>
              </tr>
              <tr>
                <td>Parcela 3</td>
                <td>R$ 1580,00 + R$ 158,00 - R$ 400,00 = R$ 1338,00</td>
              </tr>
              <tr>
                <td>Parcela 4</td>
                <td>R$ 1338,00 + R$ 133,80 - R$ 400,00 = R$ 1071,80</td>
              </tr>
              <tr>
                <td>Parcela 5</td>
                <td>R$ 1071,80 + R$ 107,18 - R$ 400,00 = R$ 778,98</td>
              </tr>
              <tr>
                <td>Parcela 6</td>
                <td>R$ 778,98 + R$ 77,89 - R$ 400,00 = R$ 456,87</td>
              </tr>
              <tr>
                <td>Parcela 7</td>
                <td>R$ 456,87 + R$ 45,68 - R$ 400,00 = R$ 102,55</td>
              </tr>
            </tbody>
            <div className="rodape">
              <Button variant="primary" size="sm">
                Contratar Empréstimo
              </Button>
            </div>
          </table>
        </Modal>
      )}
    </Container>
  );
};
