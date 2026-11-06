<script setup lang="ts">
import type { Productos } from '~/types/Productos'

defineProps<{
    producto: Productos
}>()

const formatPrice = (val: number | string) => {
    return Number(val).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}
</script>

<template>
    <UCard
        class="border border-default bg-elevated rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
        <template #header>
            <div class="h-44 -m-4 mb-0 bg-accented/30 relative overflow-hidden flex items-center justify-center">
                <img v-if="producto.imagen" :src="producto.imagen" :alt="producto.nombre"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                <div
                    class="hidden absolute inset-0 flex-col items-center justify-center text-muted gap-1 bg-accented/40">
                    <UIcon name="i-heroicons-cake" class="w-10 h-10 text-primary" />
                </div>
            </div>
        </template>

        <div class="flex-1 flex flex-col">
            <h3 class="font-bold text-lg text-highlighted line-clamp-1">
                {{ producto.nombre }}
            </h3>
            <p class="text-xs sm:text-sm text-muted mt-1 line-clamp-2">
                {{ producto.descripcion || 'Sin descripción disponible.' }}
            </p>
        </div>

        <template #footer>
            <div class="flex items-center justify-between gap-2">
                <span class="font-bold text-base sm:text-lg text-primary">
                    {{ formatPrice(producto.precio) }}
                </span>
                <UButton size="sm" color="primary" icon="i-heroicons-plus" class="font-medium">
                    Añadir
                </UButton>
            </div>
        </template>
    </UCard>
</template>