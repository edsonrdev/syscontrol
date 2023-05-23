import { Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Painel } from "../pages/Painel";
import { Clientes } from "../pages/Clientes";
import { Cliente } from "../pages/Cliente";
import { CadastrarCliente } from "../pages/CadastrarCliente";
import { EditarCliente } from "../pages/EditarCliente";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/entrar" component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />
    <Route path="/painel" component={Painel} />
    <Route path="/cliente/cadastrar" component={CadastrarCliente} />
    <Route path="/cliente/editar/:id" component={EditarCliente} />
    <Route path="/cliente/:id" component={Cliente} />
    <Route path="/clientes" component={Clientes} />
  </Switch>
);
