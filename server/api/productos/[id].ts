export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const user = session.user as { rol?: string } | undefined

  if (user?.rol !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Acceso no autorizado' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  const method = getMethod(event)

  if (method === 'PUT') {
    const body = await readBody(event)
    return await prisma.productos.update({
      where: { id },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion || null,
        precio: Number(body.precio),
        disponibilidad: Number(body.disponibilidad),
        producto_visible: Boolean(body.producto_visible),
        imagen: body.imagen || null,
        categoria_id: Number(body.categoria_id)
      }
    })
  }

  if (method === 'DELETE') {
    await prisma.productos.delete({
      where: { id }
    })
    return { ok: true }
  }
})