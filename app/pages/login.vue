<script setup lang="ts">
import { z } from 'zod'
import type { Usuario } from '~/types/Usuario'

definePageMeta({
    layout: 'auth'
})

const schemaLogin = z.object({
    email: z.string().email('Ingresa un correo electrónico válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const iniciandoSesion = ref(false)
const errorForm = ref('')
const formLogin = reactive({
    email: '',
    password: ''
})

const { user, fetch: fetchSession } = useUserSession()

async function login() {
    iniciandoSesion.value = true
    errorForm.value = ''

    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: formLogin.email,
                password: formLogin.password
            }
        })

        await fetchSession()

        const usuarioActual = user.value as Usuario | null

        if (usuarioActual?.rol === 'admin') {
            await navigateTo('/admin')
        } else {
            await navigateTo('/')
        }
    } catch (err: any) {
        errorForm.value = getApiErrorMessage(err, 'Credenciales no válidas o problema en el servidor')
    } finally {
        iniciandoSesion.value = false
    }
}
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-default px-4 py-10 sm:px-6 lg:px-8 relative">

        <UButton to="/" icon="i-heroicons-arrow-left" size="md" color="neutral" variant="ghost"
            class="absolute left-6 top-6 rounded-full" aria-label="Volver al inicio" />

        <div class="w-full max-w-md shrink-0">
            <div class="bg-elevated/80 border border-default rounded-2xl p-6 sm:p-8 shadow-xs backdrop-blur-xs">

                <div class="space-y-2 text-center mb-6">
                    <span class="text-3xl font-extrabold tracking-tight text-highlighted block">
                        Tenta2
                    </span>
                    <p class="text-xs font-semibold uppercase tracking-wider text-primary">
                        Pastelería & Repostería Artesanal
                    </p>
                    <h2 class="text-lg font-bold text-highlighted pt-1">
                        Iniciar Sesión
                    </h2>
                </div>

                <UForm class="flex flex-col gap-4" :state="formLogin" :schema="schemaLogin" @submit="login">
                    <UFormField label="Correo electrónico" name="email">
                        <UInput v-model="formLogin.email" placeholder="tu@correo.com" type="email" size="lg"
                            class="w-full" />
                    </UFormField>

                    <UFormField label="Contraseña" name="password">
                        <UInput v-model="formLogin.password" placeholder="••••••••" type="password" size="lg"
                            class="w-full" />
                    </UFormField>

                    <UAlert v-if="errorForm" color="error" variant="subtle" icon="i-heroicons-exclamation-circle"
                        :title="errorForm" />

                    <UButton type="submit" :loading="iniciandoSesion" color="primary" size="lg"
                        class="w-full font-semibold justify-center mt-2 shadow-xs">
                        Entrar
                    </UButton>

                    <NuxtLink to="/"
                        class="block text-center text-xs text-muted hover:text-highlighted transition-colors py-1 mt-1">
                        Cancelar y volver al inicio
                    </NuxtLink>
                </UForm>

            </div>
        </div>
    </div>
</template>