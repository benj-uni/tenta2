import type { Usuario } from '~/types/Usuario'

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession()
  const usuario = user.value as Usuario | null

  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  if (usuario?.rol !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Acceso Denegado' })
  }
})