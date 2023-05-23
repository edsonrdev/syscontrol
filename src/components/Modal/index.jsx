import { useContext } from "react";
import { ModalContext } from "../../providers/modal";

import { Container, Content } from "./styles";
import { IoClose } from "react-icons/io5";

export const Modal = ({ title, children }) => {
  const { setShowModal } = useContext(ModalContext);

  return (
    <Container>
      <Content>
        <header className="modal-title">
          <h2>{title}</h2>
          <span>
            <IoClose size={20} onClick={() => setShowModal(false)} />
          </span>
        </header>

        <main className="modal-body">{children}</main>
      </Content>
    </Container>
  );
};
