import { useState, useEffect } from "react";
import { Container } from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { api } from "../../services";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// import { api } from "../../services";

export const EditarCliente = () => {
  const { id } = useParams();
  const history = useHistory();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    api
      .get(`/clientes/${id}`)
      .then((resp) => {
        setCliente(resp.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // console.log(cliente);

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório!"),
    address: yup.string().required("Endereço é obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitCallback = async (data) => {
    // console.log(data);
    api
      .put(`/clientes/${id}`, data)
      .then((resp) => {
        // console.log(resp);
        toast.success("Cliente editado com sucesso!");
        history.push("/clientes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="search-client-section">
            <h1 className="page-title">Editar Cliente</h1>
          </div>

          <form
            className="form-cadastrar-cliente"
            onSubmit={handleSubmit(submitCallback)}
          >
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                placeholder="Edson Rodrigues"
                defaultValue={cliente.name}
                {...register("name")}
              />
              <span className="error">{errors.name?.message}</span>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone:</label>
              <input
                type="number"
                id="phone"
                placeholder="87996467409"
                defaultValue={cliente.phone}
                {...register("phone")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                placeholder="Floresta-PE"
                defaultValue={cliente.address}
                {...register("address")}
              />
              <span className="error">{errors.address?.message}</span>
            </div>

            <div className="form-group">
              <Button type="submit" variant="primary">
                Editar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </Container>
  );
};
