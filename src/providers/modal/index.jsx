import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [typeModal, setTypeModal] = useState("");
  const [entityModal, setEntityModal] = useState({});
  const [showModal, setShowModal] = useState(false);

  const resetModal = () => {
    setTypeModal("");
    setEntityModal({});
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        typeModal,
        setTypeModal,
        entityModal,
        setEntityModal,
        resetModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
