<script setup lang="ts">
const route = useRoute()

const isActive = (to: string) => route.path === to

const vista = [
    { label: 'Inicio', to: '/' },
    { label: 'Productos', to: '/productos' },
]

const sesion = [
    { label: 'Carrito', to: '/carrito' },
    { label: 'Iniciar sesión', to: '/login' },
]
</script>

<template>
    <div class="min-h-screen bg-default text-default flex flex-col font-sans">
        <nav class="sticky top-0 z-50 backdrop-blur-md bg-(--ui-bg)/90 border-b border-default shadow-xs">
            <UContainer class="flex items-center justify-between h-20">

                <div class="flex items-center gap-2 select-none">
                    <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-highlighted">
                        Tenta2
                    </span>
                </div>

                <div class="flex gap-6 md:gap-8 items-center">
                    <NuxtLink v-for="link in vista" :key="link.to" :to="link.to" :class="isActive(link.to)
                        ? 'text-highlighted font-semibold border-b-2 border-primary pb-1'
                        : 'text-muted hover:text-highlighted transition-colors font-medium'">
                        {{ link.label }}
                    </NuxtLink>
                </div>

                <div class="flex gap-6 md:gap-8 items-center">
                    <NuxtLink v-for="link in sesion" :key="link.to" :to="link.to" :class="isActive(link.to)
                        ? 'text-highlighted font-semibold border-b-2 border-primary pb-1'
                        : 'text-muted hover:text-highlighted transition-colors font-medium'">
                        {{ link.label }}
                    </NuxtLink>
                </div>

            </UContainer>
        </nav>

        <main class="flex-1">
            <slot />
        </main>

        <footer class="bg-muted border-t border-default py-8 mt-auto">
            <div class="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center px-4">
                <span class="font-extrabold text-lg tracking-tight text-highlighted">
                    Tenta2
                </span>

                <p class="text-muted text-sm">
                    © 2026 Tenta2. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    </div>
</template>