<template>
    <header
        class="border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur sticky top-0 z-50">
        <UContainer class="flex items-center justify-between h-16">
            <!-- Logo o Título -->
            <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-primary">
                <span>TSI Proyecto</span>
            </NuxtLink>

            <!-- Enlaces de Navegación -->
            <nav class="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                <NuxtLink to="/" class="hover:text-primary transition">Inicio</NuxtLink>
                <NuxtLink to="/modulo1" class="hover:text-primary transition">Módulo 1</NuxtLink>
                <NuxtLink to="/acerca" class="hover:text-primary transition">Acerca</NuxtLink>
            </nav>

            <!-- Botón de acción / Login -->
            <div class="flex items-center gap-3">
                <UButton to="/login" color="primary" variant="solid">
                    Ingresar
                </UButton>
            </div>
        </UContainer>
    </header>
</template>