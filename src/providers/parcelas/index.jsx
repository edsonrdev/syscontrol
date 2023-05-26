import { createContext, useState } from "react";

export const ParcelasContext = createContext();

export const ParcelasProvider = ({ children }) => {
  const [parcelas, setParcelas] = useState([]);

  return (
    <ParcelasContext.Provider
      value={{
        parcelas,
        setParcelas,
      }}
    >
      {children}
    </ParcelasContext.Provider>
  );
};
