import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [entityModal, setEntityModal] = useState({});

  const resetModal = () => {
    setShowModal(false);
    setTypeModal("");
    setEntityModal({});
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
