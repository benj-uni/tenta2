import type { Usuario } from '~/types/Usuario'

declare module '#auth-utils' {
  interface User extends Usuario {}
  interface UserSession {
    user: Usuario
  }
}

export {}