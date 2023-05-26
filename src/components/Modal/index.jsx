import { useContext } from "react";
import { ModalContext } from "../../providers/modal";
import { ParcelasContext } from "../../providers/parcelas";

import { Container, Content } from "./styles";
import { IoClose } from "react-icons/io5";

export const Modal = ({ title, children, parcelas = [], ...rest }) => {
  const { resetModal } = useContext(ModalContext);
  const { setParcelas } = useContext(ParcelasContext);

  const reset = () => {
    setParcelas([]);
    resetModal();
  };

  return (
    <Container>
      <Content {...rest}>
        <header className="modal-title">
          <h2>{title}</h2>
          <span>
            <IoClose size={20} onClick={reset} />
          </span>
        </header>

        <main className="modal-body">{children}</main>
      </Content>
    </Container>
  );
};
