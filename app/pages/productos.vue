<script setup lang="ts">
import type { Categorias } from '~/types/Categoria'

const { data: categorias, pending, error } = await useFetch<Categorias[]>('/api/categorias')
</script>

<template>
    <div class="py-8 sm:py-12 bg-default min-h-[calc(100vh-5rem)]">
        <UContainer>
            <div class="space-y-3 pb-8 mb-8 border-b border-default/60">
                <div class="flex items-center gap-2">
                    <span class="inline-block w-8 h-1 bg-primary rounded-full" />
                    <span class="text-xs uppercase tracking-widest font-bold text-primary">
                        Catálogo
                    </span>
                </div>

                <h1 class="text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl">
                    Nuestros Productos
                </h1>

                <p class="text-sm sm:text-base text-muted max-w-xl">
                    Descubre nuestras preparaciones recién horneadas y seleccionadas por categoría.
                </p>
            </div>

            <div v-if="pending" class="flex flex-col gap-10 py-6">
                <div v-for="n in 2" :key="n" class="space-y-4">
                    <div class="h-8 w-48 bg-accented rounded-lg animate-pulse" />
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div v-for="m in 4" :key="m" class="h-64 bg-elevated rounded-xl animate-pulse" />
                    </div>
                </div>
            </div>

            <div v-else-if="error" class="text-center py-16">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 class="text-xl font-bold text-highlighted">
                    Error al cargar los productos
                </h2>
                <p class="text-sm text-muted mt-1 max-w-md mx-auto">
                    {{ getApiErrorMessage(error, 'No fue posible conectar con el servidor o la base de datos.') }}
                </p>
            </div>

            <div v-else class="flex flex-col gap-12 sm:gap-16">
                <section v-for="cat in categorias" :key="cat.id"
                    class="flex flex-col gap-5 border-b border-muted pb-10 last:border-b-0">
                    <!-- Encabezado de la Categoría -->
                    <div class="flex items-center gap-3">
                        <div class="h-6 w-1.5 bg-primary rounded-full" />
                        <div>
                            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-highlighted">
                                {{ cat.nombre }}
                            </h2>
                            <p v-if="cat.descripcion" class="text-sm text-muted mt-0.5">
                                {{ cat.descripcion }}
                            </p>
                        </div>
                    </div>

                    <div v-if="cat.producto && cat.producto.length > 0"
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <CardsProducto v-for="prod in cat.producto" :key="prod.id" :producto="prod" />
                    </div>

                    <div v-else
                        class="p-6 rounded-xl border border-dashed border-default bg-elevated/40 text-center text-muted text-sm">
                        No hay productos disponibles en esta categoría por el momento.
                    </div>
                </section>
            </div>

        </UContainer>
    </div>
</template>