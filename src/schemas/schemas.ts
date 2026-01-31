import * as yup from "yup";

const createUserSchema = yup.object({
  body: yup.object({
    name: yup.string().required("Nome é obrigatório"),
    username: yup.string().required("Nome de usuário é obrigatório"),
    password: yup
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas devem coincidir")
      .required("Confirmação de senha é obrigatória"),
    roleId: yup.string().required("ID do papel é obrigatório"),
  }),
});

const createSessionSchema = yup.object({
  body: yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .noUnknown(true)
    .strict(),
});

export { createUserSchema, createSessionSchema };
