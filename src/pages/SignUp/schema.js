import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido!")
    .required("Email é obrigatório!"),
  password: yup.string().required("Senha é obrigatória!"),
  passwordConfirm: yup.string().required("Confirmação de senha é obrigatória!"),
});

export default schema;
