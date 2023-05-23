import { Header } from "../../components/Header";
import moneyIcon from "../../assets/money.svg";
import { Button } from "../../components/Button";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";

export const Home = () => {
  const history = useHistory();

  return (
    <Container>
      <Header />

      <main>
        <div className="container">
          <div className="home-title">
            <h2>
              <span>SysControl</span> | Sistema de <br /> Controle de
              Empréstimos
            </h2>

            <span>Organize os seus empréstimos em um só lugar!</span>

            <p>
              Tenha mais controle, organização e agilidade no seu negócio, com o{" "}
              <strong>SysControl</strong>.
            </p>

            <Button variant="primary" onClick={(e) => history.push("/entrar")}>
              Vamos começar?
            </Button>
          </div>

          <div className="hero-image">
            <img src={moneyIcon} alt="Ícone de dinheiro" />
          </div>
        </div>
      </main>
    </Container>
  );
};
