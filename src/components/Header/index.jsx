import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { User } from "../../components/User";
import { Button } from "../../components/Button";

import { Container } from "./styles";

export const Header = ({ page }) => {
  const history = useHistory();
  const [logged] = useState(false);

  return (
    <Container page={page}>
      <div className="container">
        {logged ? (
          <>
            <h1 onClick={() => history.push("/")}>
              <span>Sys</span>Control
            </h1>

            <div className="buttons">
              <Button
                size="lg"
                variant="primary"
                onClick={(e) => history.push("/entrar")}
              >
                Entrar
              </Button>

              {/* <Button
                size="lg"
                variant="outline"
                onClick={(e) => history.push("/cadastrar")}
              >
                Criar
              </Button> */}
            </div>
          </>
        ) : (
          <>
            <ul className="links">
              <li>
                <Link
                  to="/painel"
                  className={page === "painel" ? "active" : ""}
                >
                  Painel
                </Link>
              </li>
              <li>
                <Link
                  to="/clientes"
                  className={page === "clientes" ? "active" : ""}
                >
                  Clientes
                </Link>
              </li>
            </ul>

            <User />
          </>
        )}
      </div>
    </Container>
  );
};
