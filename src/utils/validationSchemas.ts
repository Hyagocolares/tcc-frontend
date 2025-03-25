import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required('Nome de usuário é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória')
})
