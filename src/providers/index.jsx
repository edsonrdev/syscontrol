import { ModalProvider } from "./modal";
import { ParcelasProvider } from "./parcelas";

export const Providers = ({ children }) => (
  <ParcelasProvider>
    <ModalProvider>{children}</ModalProvider>
  </ParcelasProvider>
);
