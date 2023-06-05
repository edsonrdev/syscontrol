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

  console.log(clientes);

  const {
    showModal,
    setShowModal,
    typeModal,
    setTypeModal,
    dataModal,
    setDataModal,
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
      const { data } = await api.get("/clientes");
      setClientes(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getClientes();
  }, [clientes]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", phone: "", address: "" });
    }
  }, [formState, reset]);

  const submitCallback = async (data) => {
    try {
      await api.post("/clientes", data);
      toast.success("Cliente cadastrado com sucesso!");
    } catch (err) {
      toast.error(err.response.data.message);
    }

    setShowModal(false);
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
                placeholder="Buscar cliente pelo nome..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                disabled={!clientes.length}
              />
            </div>

            <Button variant="primary" onClick={() => setShowModal(true)}>
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

            {/* {clientes.length ? (
              <li className="client-header">
                <span>Cliente</span>
                <span>Opções</span>
              </li>
            ) : (
              ""
            )} */}

            {!clientes.length ? (
              <p>Sem clientes cadastrados.</p>
            ) : clientes.length && !pesquisa ? (
              clientes.map((cliente) => (
                <li key={cliente.id}>
                  <span className="client-name">{cliente.name}</span>
                  <div className="options">
                    <HiEye
                      className="view-details"
                      data-tooltip-content="Acessar cliente"
                      onClick={() => history.push(`/cliente/${cliente.id}`)}
                    />

                    <span className="divider">|</span>

                    <RiEdit2Fill
                      className="edit-client"
                      data-tooltip-content="Editar cliente"
                      onClick={() =>
                        history.push(`/cliente/editar/${cliente.id}`)
                      }
                    />
                  </div>
                </li>
              ))
            ) : clientesPesquisados.length && pesquisa ? (
              clientesPesquisados.map((cliente) => (
                <li key={cliente.id}>
                  <span className="client-name">{cliente.name}</span>
                  <div className="options">
                    <HiEye
                      className="view-details"
                      data-tooltip-content="Ver detalhes"
                      onClick={() => history.push(`/cliente/${cliente.id}`)}
                    />

                    <span className="divider">|</span>

                    <RiEdit2Fill
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
              <p>
                Sem resultados para esta busca:{" "}
                <span className="cliente-pesquisado">{pesquisa}</span>
              </p>
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
