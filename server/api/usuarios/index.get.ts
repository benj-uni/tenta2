export default defineEventHandler(async () => {
    return await prisma.usuario.findMany({
        orderBy: { nombre: 'asc' }
    })
})