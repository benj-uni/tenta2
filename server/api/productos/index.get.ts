export default defineEventHandler(async () => {
  return await prisma.productos.findMany({
    orderBy: { id: 'desc' },
    include: {
      categoria: true
    }
  })
})