export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const user = session.user as { rol?: string } | undefined

  if (user?.rol !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Acceso no autorizado' })
  }

  const body = await readBody(event)

  if (!body.nombre || body.precio === undefined || !body.categoria_id) {
    throw createError({ statusCode: 400, statusMessage: 'Campos obligatorios incompletos' })
  }

  return await prisma.productos.create({
    data: {
      nombre: body.nombre,
      descripcion: body.descripcion || null,
      precio: Number(body.precio),
      disponibilidad: Number(body.disponibilidad ?? 0),
      producto_visible: Boolean(body.producto_visible ?? true),
      imagen: body.imagen || null,
      categoria_id: Number(body.categoria_id)
    }
  })
})