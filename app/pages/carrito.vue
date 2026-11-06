<script setup lang="ts">
const itemsCarrito = ref<any[]>([])

const formatPrecio = (valor: number) => {
    return '$' + Number(valor).toLocaleString('es-CL')
}

const calcularTotalGeneral = computed(() => {
    return itemsCarrito.value.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
})
</script>

<template>
    <div class="py-10 bg-default min-h-screen text-default">
        <UContainer class="space-y-8">

            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-highlighted">
                    Carro de Compras
                </h1>
                <p class="text-sm text-muted mt-1">
                    Revisa y confirma los productos seleccionados antes de continuar.
                </p>
            </div>

            <div v-if="itemsCarrito.length === 0"
                class="border border-dashed border-default rounded-2xl bg-elevated/40 p-12 text-center space-y-4">
                <UIcon name="i-heroicons-shopping-cart" class="w-16 h-16 text-muted mx-auto" />
                <div class="space-y-1">
                    <h3 class="text-lg font-bold text-highlighted">
                        Tu carro está vacío
                    </h3>
                    <p class="text-sm text-muted max-w-sm mx-auto">
                        Aún no has agregado ningún producto a tu pedido. Explora nuestro catálogo para comenzar.
                    </p>
                </div>
                <UButton to="/productos" color="primary" icon="i-heroicons-arrow-left" class="mt-2 font-medium">
                    Ver productos
                </UButton>
            </div>

            <div v-else class="space-y-8">
                <div class="border border-default rounded-xl bg-elevated shadow-xs overflow-x-auto">
                    <table class="w-full text-left text-sm border-collapse min-w-187.5">
                        <thead>
                            <tr class="bg-accented/20 border-b-2 border-primary/80 text-muted font-semibold">
                                <th scope="col" class="py-3 px-4 text-center w-16">Borrar</th>
                                <th scope="col" class="py-3 px-4 text-center w-28">Foto</th>
                                <th scope="col" class="py-3 px-4 text-center w-24">Código</th>
                                <th scope="col" class="py-3 px-6">Producto</th>
                                <th scope="col" class="py-3 px-4 text-center w-32">Precio</th>
                                <th scope="col" class="py-3 px-4 text-center w-24">Cantidad</th>
                                <th scope="col" class="py-3 px-6 text-right w-32">Total</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-default">
                            <tr v-for="item in itemsCarrito" :key="item.id"
                                class="hover:bg-accented/10 transition-colors">
                                <td class="py-4 px-4 text-center">
                                    <UButton variant="ghost" color="neutral" icon="i-heroicons-trash" size="sm"
                                        class="text-muted hover:text-error transition-colors" />
                                </td>

                                <td class="py-4 px-4 text-center">
                                    <div
                                        class="w-20 h-16 mx-auto rounded-lg overflow-hidden bg-accented/30 flex items-center justify-center border border-default">
                                        <img v-if="item.imagen" :src="item.imagen" :alt="item.nombre"
                                            class="w-full h-full object-cover" />
                                        <UIcon v-else name="i-heroicons-cake" class="w-6 h-6 text-primary" />
                                    </div>
                                </td>

                                <td class="py-4 px-4 text-center text-muted font-medium">
                                    {{ item.id }}
                                </td>

                                <td class="py-4 px-6 font-medium text-highlighted max-w-sm">
                                    {{ item.nombre }}
                                </td>

                                <td class="py-4 px-4 text-center font-medium text-highlighted">
                                    {{ formatPrecio(item.precio) }}
                                </td>

                                <td class="py-4 px-4 text-center">
                                    <input v-model.number="item.cantidad" type="number" min="1"
                                        class="w-16 text-center py-1.5 px-2 bg-default border border-default rounded-md text-highlighted text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary" />
                                </td>

                                <td class="py-4 px-6 text-right font-bold text-highlighted">
                                    {{ formatPrecio(item.precio * item.cantidad) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end pt-4">
                    <div class="w-full max-w-md space-y-4">

                        <div class="border border-default rounded-xl overflow-hidden bg-elevated shadow-xs">
                            <div
                                class="bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5">
                                Totales
                            </div>
                            <div class="flex justify-between items-center px-6 py-5">
                                <span class="text-sm font-medium text-muted">Total:</span>
                                <span class="text-xl font-extrabold text-highlighted">
                                    {{ formatPrecio(calcularTotalGeneral) }}
                                </span>
                            </div>
                        </div>

                        <div class="flex justify-end items-center gap-3">
                            <UButton color="primary" variant="subtle" size="md" class="font-semibold px-5">
                                Limpia Carro
                            </UButton>

                            <UButton color="primary" size="md" class="font-semibold px-6 shadow-xs">
                                Comprar
                            </UButton>
                        </div>

                    </div>
                </div>
            </div>

        </UContainer>
    </div>
</template>