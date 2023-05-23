import { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

import { Container } from "./styles";

import { Header } from "../../components/Header";

import { RiEdit2Fill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import { Button } from "../../components/Button";

import { ModalContext } from "../../providers/modal";
import { Modal } from "../../components/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "../../services";

export const Clientes = () => {
  const history = useHistory();

  const [clientes, setClientes] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const clientesPesquisados = clientes.filter((client) =>
    client.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  console.log(clientesPesquisados);

  const {
    showModal,
    setShowModal,
    typeModal,
    setTypeModal,
    entityModal,
    setEntityModal,
    // setModal,
    resetModal,
  } = useContext(ModalContext);

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório!"),
    address: yup.string().required("Endereço é obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getClientes = async () => {
    try {
      const { data } = await api.get("/clients");
      setClientes(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", phone: "", address: "" });
    }
  }, [formState, reset]);

  const submitCallback = async (data) => {
    if (typeModal === "cadastrarCliente") {
      try {
        await api.post("/clients", data);
        toast.success("Cliente cadastrado com sucesso!");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }

    if (typeModal === "editarCliente") {
      console.log("editar cliente mané");
    }

    setTypeModal("");
    setEntityModal({});
    setShowModal(false);
  };

  const handleCliente = (cliente) => {
    if (!(typeof cliente === "object" && cliente !== null)) {
      // console.log("cadastrar");
      setEntityModal({});
      setTypeModal("cadastrarCliente");
      setShowModal(true);
    } else if (typeof cliente === "object" && cliente !== null) {
      // console.log("editar");
      setEntityModal({ cliente });
      setTypeModal("editarCliente");
      setShowModal(true);
    }
  };

  return (
    <Container>
      <Header page="clientes" />

      <main>
        <div className="container">
          <h1 className="page-title">Lista de Clientes</h1>
          <div className="search-client-section">
            <div className="search-form">
              <input
                type="search"
                placeholder="Pesquisar pelo nome..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>

            <Button variant="primary" onClick={() => handleCliente()}>
              Cadastrar cliente
            </Button>
          </div>

          <ul className="client-list">
            <Tooltip
              anchorSelect=".view-details"
              place="left"
              style={{
                backgroundColor: "var(--brand-3)",
                fontWeight: 600,
              }}
            />
            <Tooltip
              anchorSelect=".edit-client"
              style={{
                backgroundColor: "var(--brand-3)",
                fontWeight: 600,
              }}
            />

            {clientes.length ? (
              <li className="client-header">
                <span>Cliente</span>
                <span>Opções</span>
              </li>
            ) : (
              ""
            )}

            {clientes.length !== 0 && clientesPesquisados.length === 0 ? (
              clientes.map((cliente) => (
                <li key={cliente.id}>
                  <span className="client-name">{cliente.name}</span>
                  <div className="options">
                    <Link to={`/cliente/${cliente.id}`}>
                      <HiEye
                        size={17}
                        className="view-details"
                        data-tooltip-content="Ver detalhes"
                      />
                    </Link>
                    |
                    <RiEdit2Fill
                      size={17}
                      className="edit-client"
                      data-tooltip-content="Editar cliente"
                      onClick={() =>
                        history.push(`/cliente/editar/${cliente.id}`)
                      }
                    />
                  </div>
                </li>
              ))
            ) : (
              <p>Sem clientes cadastrados no Banco de Dados!</p>
            )}
          </ul>
        </div>
      </main>

      {showModal && (
        <Modal title="Cadastrar Cliente">
          <form onSubmit={handleSubmit(submitCallback)}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                placeholder="Edson Rodrigues"
                {...register("name")}
              />
              <span className="error">{errors.name?.message}</span>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone:</label>
              <input
                type="tel"
                id="phone"
                placeholder="87996467409"
                {...register("phone")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                placeholder="Floresta-PE"
                {...register("address")}
              />
              <span className="error">{errors.address?.message}</span>
            </div>

            <div className="form-group">
              <Button type="submit" variant="primary">
                Cadastrar
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Container>
  );
};
