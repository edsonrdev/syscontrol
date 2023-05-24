import { Container } from "./styles";
import AvatarPhoto from "../../assets/avatar.png";
import { FaChevronDown } from "react-icons/fa";

export const User = () => {
  return (
    <Container>
      <div className="user-info">
        <h3 className="username">Erick Nascimento</h3>

        <div className="avatar">
          <img src={AvatarPhoto} alt="Avatar" />
        </div>

        <label htmlFor="checkbox">
          <FaChevronDown />
        </label>

        <input type="checkbox" name="checkbox" id="checkbox" />

        <ul className="dropdown-menu">
          <li>
            <a href="/ajustes">Ajustes</a>
          </li>
          <li>
            <a href="/perfil">Perfil</a>
          </li>
          <li>
            <a href="/sair">Sair</a>
          </li>
        </ul>
      </div>
    </Container>
  );
};
