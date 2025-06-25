import z from 'zod'

export const schemaLogin = z.object({
  email: z
    .string({
      message: 'el email tiene que ser un string'
    })
    .min(10, {
      message: 'El gmail tiene que tener minino 10 caracteres'
    })
    .email({
      message: 'El gmail tiene que ser un correo valido'
    }),

  password: z
    .string()
    .min(8, {
      message: 'La contraseña tiene que tener minimo 8 caracteres'
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
    })
})
