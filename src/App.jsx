import { GlobalStyles } from "./styles";
import { Providers } from "./providers";
import { Routes } from "./routes";

export const App = () => (
  <Providers>
    <GlobalStyles />
    <Routes />
  </Providers>
);
