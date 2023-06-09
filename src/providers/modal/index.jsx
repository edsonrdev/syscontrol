import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [typeModal, setTypeModal] = useState("");
  const [dataModal, setDataModal] = useState("");
  const [showModal, setShowModal] = useState(false);

  const resetModal = () => {
    setTypeModal("");
    setDataModal("");
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        typeModal,
        setTypeModal,
        dataModal,
        setDataModal,
        showModal,
        setShowModal,
        resetModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
