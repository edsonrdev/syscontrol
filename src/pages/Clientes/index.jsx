import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

import { Container } from "./styles";

import { Header } from "../../components/Header";

import { BiSearch } from "react-icons/bi";
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
  const [clientes, setClientes] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const clientesPesquisados = clientes.filter((client) =>
    client.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const {
    showModal,
    setShowModal,
    typeModal,
    setTypeModal,
    entityModal,
    setEntityModal,
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
  }, [clientes]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", phone: "", address: "" });
    }
  }, [formState, reset]);

  // useEffect(() => {

  //   setPesquisados(clientesPesquisados);
  // }, [pesquisa]);

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
      // try {
      //   await api.post("/clients", data);
      //   toast.success("Cliente cadastrado com sucesso!");
      // } catch (err) {
      //   toast.error(err.response.data.message);
      // }
    }

    resetModal(false);
  };

  const handleCadastrarCliente = () => {
    resetModal("");
    setTypeModal("cadastrarCliente");
    setShowModal(true);
  };

  const handleEditarCliente = (cliente) => {
    resetModal("");
    setTypeModal("editarCliente");
    setShowModal(true);
    setEntityModal(cliente);
  };

  console.log(pesquisa);

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

            <Button variant="primary" onClick={handleCadastrarCliente}>
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

            {clientes.length ? (
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
                      onClick={() => handleEditarCliente(cliente)}
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

      {showModal && typeModal === "cadastrarCliente" && (
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
              {errors.name?.message}
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
              {errors.address?.message}
            </div>

            <div className="form-group">
              <Button type="submit" variant="primary">
                Cadastrar
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {showModal && typeModal === "editarCliente" && (
        <Modal title="Editar Cliente">
          <form onSubmit={handleSubmit(submitCallback)}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                placeholder="Edson Rodrigues"
                {...register("name")}
                defaultValue={entityModal?.name}
              />
              {errors.name?.message}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone:</label>
              <input
                type="tel"
                id="phone"
                placeholder="87996467409"
                {...register("phone")}
                defaultValue={entityModal?.phone}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                placeholder="Floresta-PE"
                {...register("address")}
                defaultValue={entityModal?.address}
              />
              {errors.address?.message}
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
