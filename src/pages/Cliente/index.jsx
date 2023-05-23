import { Container } from "./styles";

import { Header } from "../../components/Header";

export const Cliente = () => {
  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="search-client-section">
            <h1 className="page-title">Cliente: Jim Carrey</h1>
          </div>
        </div>
      </main>
    </Container>
  );
};
