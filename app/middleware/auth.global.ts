import type { Usuario } from '~/types/Usuario'

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession()
  const usuarioActual = user.value as Usuario | null

  if (to.path.startsWith('/admin')) {
    if (!loggedIn.value) {
      return navigateTo('/login')
    }

    if (usuarioActual?.rol !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Acceso Denegado' })
    }
  }
})