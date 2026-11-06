export default defineEventHandler(async () => {
  return await prisma.categorias.findMany({
    orderBy: { nombre: 'asc' },
    include: {
      producto: {
        where: {
          producto_visible: true
        },
        orderBy: { nombre: 'asc' }
      }
    }
  })
})