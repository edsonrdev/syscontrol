import { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { format } from "date-fns";
import { convertToRealBR } from "../../utils/helpers";

import { Container } from "./styles";
import { api } from "../../services";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { ModalContext } from "../../providers/modal";
import { ParcelasContext } from "../../providers/parcelas";
import { Modal } from "../../components/Modal";
import { toast } from "react-toastify";
import { BsCheckCircleFill } from "react-icons/bs";

import { convertDate } from "../../utils/helpers";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const EditarUsuario = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Nome de Usuário é obrigatório!")
      .min(4, "Mínimo de 4 caracteres!"),
    photo: yup.string().required("Imagem de Perfil é obrigatória!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitCallback = (d) => {
    console.log(d);
  };

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="search-client-section">
            <h1 className="page-title">Editar Usuário</h1>
          </div>

          <hr />

          <div className="update-form-wrapper">
            <form onSubmit={handleSubmit(submitCallback)}>
              <div className="form-group">
                <label htmlFor="username">Nome de Usuário:</label>
                <Input
                  register={register}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Digite seu nome..."
                />
                <span className="error">{errors.username?.message}</span>
              </div>

              <div className="form-group">
                <label htmlFor="photo">Imagem de Perfil:</label>
                <Input
                  register={register}
                  type="file"
                  id="photo"
                  name="photo"
                  placeholder="Digite uma senha bem segura..."
                  accept="image/jpg, image/png"
                />
                <span className="error">{errors.photo?.message}</span>
              </div>

              <Button type="submit" variant="primary" size="lg">
                Atualizar Perfil
              </Button>
            </form>
          </div>
        </div>
      </main>
    </Container>
  );
};
