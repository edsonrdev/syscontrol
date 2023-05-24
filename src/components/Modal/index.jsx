import { useContext } from "react";
import { ModalContext } from "../../providers/modal";

import { Container, Content } from "./styles";
import { IoClose } from "react-icons/io5";

export const Modal = ({ title, children, ...rest }) => {
  const { resetModal } = useContext(ModalContext);

  return (
    <Container>
      <Content {...rest}>
        <header className="modal-title">
          <h2>{title}</h2>
          <span>
            <IoClose size={20} onClick={resetModal} />
          </span>
        </header>

        <main className="modal-body">{children}</main>
      </Content>
    </Container>
  );
};
