<script setup lang="ts">
import { z } from 'zod'
import type { Productos } from '~/types/Productos'
import type { Categorias } from '~/types/Categoria'

definePageMeta({
    middleware: ['admin']
})

const toast = useToast()

const { data: categorias, pending, error, refresh } = await useFetch<Categorias[]>('/api/categorias')

const mostrarProductos = ref(false)
const categoriaSeleccionadaId = ref<number | 'todas'>('todas')

async function listarProductos() {
    mostrarProductos.value = true
    await refresh()
}

function ocultarProductos() {
    mostrarProductos.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function seleccionarCategoria(id: number | 'todas') {
    categoriaSeleccionadaId.value = id
}

const categoriasFiltradas = computed(() => {
    if (!categorias.value) return []
    if (categoriaSeleccionadaId.value === 'todas') {
        return categorias.value
    }
    return categorias.value.filter(c => c.id === categoriaSeleccionadaId.value)
})

const mostrarFormAgregar = ref(false)
const esModoEdicion = ref(false)
const idEdicion = ref<number | null>(null)
const guardandoProducto = ref(false)
const errorFormAgregar = ref('')

const mostrarConfirmBorrar = ref(false)
const borrandoProducto = ref(false)
const productoABorrar = ref<Productos | null>(null)

const schemaProducto = z.object({
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    precio: z.number().min(1, 'El precio debe ser mayor a 0'),
    disponibilidad: z.number().min(0, 'El stock no puede ser negativo'),
    categoria_id: z.number({ message: 'Selecciona una categoría' })
})

const formProducto = reactive({
    nombre: '',
    descripcion: '',
    precio: 0,
    disponibilidad: 1,
    producto_visible: true,
    imagen: '',
    categoria_id: undefined as number | undefined
})

const opcionesCategorias = computed(() => {
    return categorias.value?.map(c => ({ label: c.nombre, value: c.id })) ?? []
})

function resetForm() {
    formProducto.nombre = ''
    formProducto.descripcion = ''
    formProducto.precio = 0
    formProducto.disponibilidad = 1
    formProducto.producto_visible = true
    formProducto.imagen = ''
    formProducto.categoria_id = typeof categoriaSeleccionadaId.value === 'number'
        ? categoriaSeleccionadaId.value
        : (categorias.value?.[0]?.id ?? undefined)
    idEdicion.value = null
    errorFormAgregar.value = ''
}

function abrirModalCrear() {
    esModoEdicion.value = false
    resetForm()
    mostrarFormAgregar.value = true
}

function abrirModalEditar(prod: Productos) {
    esModoEdicion.value = true
    idEdicion.value = prod.id
    formProducto.nombre = prod.nombre
    formProducto.descripcion = prod.descripcion || ''
    formProducto.precio = Number(prod.precio)
    formProducto.disponibilidad = prod.disponibilidad
    formProducto.producto_visible = prod.producto_visible
    formProducto.imagen = prod.imagen || ''
    formProducto.categoria_id = prod.categoria_id ?? (prod.categoria?.id ?? undefined)
    errorFormAgregar.value = ''
    mostrarFormAgregar.value = true
}

function cerrarModalForm() {
    mostrarFormAgregar.value = false
    resetForm()
}

async function guardarProducto() {
    guardandoProducto.value = true
    errorFormAgregar.value = ''

    try {
        if (esModoEdicion.value && idEdicion.value) {
            await $fetch(`/api/productos/${idEdicion.value}`, {
                method: 'PUT',
                body: formProducto
            })
            toast.add({ title: 'Producto actualizado con éxito', color: 'primary' })
        } else {
            await $fetch('/api/productos', {
                method: 'POST',
                body: formProducto
            })
            toast.add({ title: 'Producto creado con éxito', color: 'primary' })
        }
        cerrarModalForm()
        mostrarProductos.value = true
        await refresh()
    } catch (err: any) {
        errorFormAgregar.value = getApiErrorMessage(err, 'No se pudo guardar el producto.')
    } finally {
        guardandoProducto.value = false
    }
}

function confirmarBorrarProducto(prod: Productos) {
    productoABorrar.value = prod
    mostrarConfirmBorrar.value = true
}

function cerrarConfirmBorrar() {
    productoABorrar.value = null
    mostrarConfirmBorrar.value = false
}

async function borrarProducto() {
    if (!productoABorrar.value) return
    borrandoProducto.value = true

    try {
        await $fetch(`/api/productos/${productoABorrar.value.id}`, { method: 'DELETE' })
        toast.add({
            title: 'Producto eliminado',
            description: `Se eliminó ${productoABorrar.value.nombre}`,
            color: 'neutral'
        })
        cerrarConfirmBorrar()
        await refresh()
    } catch (err: any) {
        toast.add({
            title: 'Error al eliminar',
            description: getApiErrorMessage(err, 'No fue posible borrar el registro'),
            color: 'error'
        })
    } finally {
        borrandoProducto.value = false
    }
}

async function cerrarSesion() {
    const { clear } = useUserSession()
    await $fetch('/api/auth/logout', { method: 'POST' })
    await clear()
    await navigateTo('/login')
}
</script>

<template>
    <div class="min-h-screen bg-default text-default py-8">
        <UContainer class="space-y-8">

            <section class="flex flex-row items-center justify-between border-b border-default pb-6 w-full">
                <div>
                    <h1 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
                        Portal de Administración
                    </h1>
                    <p class="mt-2 text-sm text-muted">
                        Gestiona los productos, precios y visibilidad de Tenta2.
                    </p>
                </div>

                <div class="ml-auto">
                    <UButton color="neutral" variant="ghost" icon="i-heroicons-arrow-right-start-on-rectangle"
                        @click="cerrarSesion">
                        Cerrar Sesión
                    </UButton>
                </div>
            </section>

            <div class="border border-dashed border-default rounded-2xl bg-elevated/40 p-6 sm:p-8 space-y-8">

                <div class="text-center max-w-xl mx-auto space-y-6">
                    <UIcon name="i-heroicons-squares-2x2" class="w-12 h-12 text-muted mx-auto" />

                    <h2 class="text-2xl font-bold tracking-tight text-highlighted">
                        Productos
                    </h2>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div
                            class="flex flex-col items-center justify-between p-5 rounded-xl bg-default/60 border border-default space-y-3">
                            <span class="text-sm font-medium text-highlighted text-center">
                                Desplegar productos por categoría
                            </span>
                            <UButton v-if="!mostrarProductos" size="md" color="primary" icon="i-heroicons-arrow-path"
                                :loading="pending" class="w-full justify-center" @click="listarProductos">
                                Listar
                            </UButton>
                            <UButton v-else size="md" color="neutral" variant="outline" icon="i-heroicons-eye-slash"
                                class="w-full justify-center" @click="ocultarProductos">
                                Ocultar
                            </UButton>
                        </div>

                        <div
                            class="flex flex-col items-center justify-between p-5 rounded-xl bg-default/60 border border-default space-y-3">
                            <span class="text-sm font-medium text-highlighted text-center">
                                Agregar producto
                            </span>
                            <UButton size="md" color="primary" variant="subtle" icon="i-heroicons-plus"
                                class="w-full justify-center" @click="abrirModalCrear">
                                Agregar
                            </UButton>
                        </div>
                    </div>
                </div>

                <div v-if="mostrarProductos" class="space-y-8 pt-6 border-t border-default/70">

                    <div class="space-y-3">
                        <p class="text-xs font-semibold uppercase tracking-wider text-muted text-center sm:text-left">
                            Filtrar por categoría:
                        </p>
                        <div class="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                            <UButton size="sm" :variant="categoriaSeleccionadaId === 'todas' ? 'solid' : 'subtle'"
                                :color="categoriaSeleccionadaId === 'todas' ? 'primary' : 'neutral'"
                                @click="seleccionarCategoria('todas')">
                                Todas las categorías
                            </UButton>

                            <UButton v-for="cat in categorias" :key="cat.id" size="sm"
                                :variant="categoriaSeleccionadaId === cat.id ? 'solid' : 'subtle'"
                                :color="categoriaSeleccionadaId === cat.id ? 'primary' : 'neutral'"
                                @click="seleccionarCategoria(cat.id)">
                                {{ cat.nombre }}
                                <UBadge size="xs" variant="outline" class="ml-1.5 px-1.5 py-0">
                                    {{ cat.producto?.length ?? 0 }}
                                </UBadge>
                            </UButton>
                        </div>
                    </div>

                    <div v-if="pending" class="text-center py-8 text-muted flex items-center justify-center gap-2">
                        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin text-primary" />
                        Cargando catálogo por categorías...
                    </div>

                    <div v-else-if="error" class="text-center py-8 text-error">
                        Error al cargar los datos. Por favor revisa la conexión con el servidor.
                    </div>

                    <div v-else-if="!categorias || categorias.length === 0" class="text-center py-8 text-muted">
                        No hay categorías registradas en la base de datos.
                    </div>

                    <div v-else class="space-y-10">
                        <section v-for="cat in categoriasFiltradas" :key="cat.id"
                            class="space-y-4 border-b border-default/60 pb-8 last:border-b-0">
                            <div class="flex items-center gap-3">
                                <div class="h-6 w-1.5 bg-primary rounded-full" />
                                <div>
                                    <h3 class="text-2xl font-bold tracking-tight text-highlighted">
                                        {{ cat.nombre }}
                                    </h3>
                                    <p v-if="cat.descripcion" class="text-xs text-muted">
                                        {{ cat.descripcion }}
                                    </p>
                                </div>
                            </div>

                            <div v-if="cat.producto && cat.producto.length > 0"
                                class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <UCard v-for="prod in cat.producto" :key="prod.id"
                                    class="border border-default bg-elevated rounded-xl shadow-xs flex flex-col justify-between overflow-hidden">
                                    <div v-if="prod.imagen"
                                        class="h-40 -mx-4 -mt-4 mb-4 overflow-hidden bg-accented/20">
                                        <img :src="prod.imagen" :alt="prod.nombre" class="w-full h-full object-cover" />
                                    </div>

                                    <div>
                                        <div class="flex justify-between items-start gap-2 mb-2">
                                            <span class="text-xs font-semibold text-primary">
                                                {{ cat.nombre }}
                                            </span>
                                            <UBadge :color="prod.producto_visible ? 'primary' : 'neutral'"
                                                variant="subtle" size="xs">
                                                {{ prod.producto_visible ? 'Visible' : 'Oculto' }}
                                            </UBadge>
                                        </div>

                                        <h4 class="text-lg font-bold text-highlighted">
                                            {{ prod.nombre }}
                                        </h4>
                                        <p class="text-xs text-muted mt-1 line-clamp-2">
                                            {{ prod.descripcion || 'Sin descripción' }}
                                        </p>

                                        <div class="mt-4 flex items-center justify-between text-sm">
                                            <span class="font-extrabold text-highlighted text-base">
                                                ${{ Number(prod.precio).toLocaleString('es-CL') }}
                                            </span>
                                            <span class="text-xs text-muted">
                                                Stock: <strong class="text-highlighted">{{ prod.disponibilidad
                                                }}</strong>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex justify-end gap-2 pt-4 mt-4 border-t border-default">
                                        <UButton size="xs" color="neutral" variant="outline"
                                            icon="i-heroicons-pencil-square" @click="abrirModalEditar(prod)">
                                            Editar
                                        </UButton>
                                        <UButton size="xs" color="error" variant="subtle" icon="i-heroicons-trash"
                                            @click="confirmarBorrarProducto(prod)">
                                            Borrar
                                        </UButton>
                                    </div>
                                </UCard>
                            </div>

                            <div v-else
                                class="p-6 rounded-xl border border-dashed border-default bg-elevated/30 text-center text-muted text-xs">
                                No hay productos asociados a esta categoría.
                            </div>
                        </section>

                        <div class="flex justify-center pt-4">
                            <UButton variant="outline" color="neutral" size="md" icon="i-heroicons-chevron-up"
                                @click="ocultarProductos">
                                Ocultar Productos
                            </UButton>
                        </div>
                    </div>
                </div>

            </div>

        </UContainer>

        <UModal v-model:open="mostrarFormAgregar" :title="esModoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'">
            <template #body>
                <UForm class="space-y-4" :state="formProducto" :schema="schemaProducto" @submit="guardarProducto">
                    <UFormField label="Nombre del Producto" name="nombre">
                        <UInput v-model="formProducto.nombre" placeholder="Ej: Pie de Limón" class="w-full" />
                    </UFormField>

                    <UFormField label="Categoría" name="categoria_id">
                        <USelect v-model="formProducto.categoria_id" :items="opcionesCategorias" value-key="value"
                            class="w-full" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="Precio (CLP)" name="precio">
                            <UInput v-model.number="formProducto.precio" type="number" class="w-full" />
                        </UFormField>

                        <UFormField label="Stock disponible" name="disponibilidad">
                            <UInput v-model.number="formProducto.disponibilidad" type="number" class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="URL de la imagen" name="imagen">
                        <UInput v-model="formProducto.imagen" placeholder="https://..." class="w-full" />
                    </UFormField>

                    <UFormField label="Descripción" name="descripcion">
                        <UTextarea v-model="formProducto.descripcion" placeholder="Detalles del producto..."
                            class="w-full" />
                    </UFormField>

                    <div class="flex items-center gap-2 pt-2">
                        <UCheckbox v-model="formProducto.producto_visible"
                            label="Publicar y hacer visible en el catálogo" />
                    </div>

                    <UAlert v-if="errorFormAgregar" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                        :title="errorFormAgregar" />

                    <div class="flex justify-end gap-3 pt-3 border-t border-default">
                        <UButton type="button" color="neutral" variant="subtle" @click="cerrarModalForm">
                            Cancelar
                        </UButton>
                        <UButton type="submit" color="primary" :loading="guardandoProducto">
                            {{ esModoEdicion ? 'Guardar Cambios' : 'Agregar Producto' }}
                        </UButton>
                    </div>
                </UForm>
            </template>
        </UModal>

        <UModal v-model:open="mostrarConfirmBorrar" title="Borrar Producto">
            <template #body>
                <div class="space-y-4">
                    <p class="text-sm text-muted">
                        ¿Estás seguro que deseas borrar el producto
                        <strong class="text-highlighted">{{ productoABorrar?.nombre }}</strong>? Esta acción no se puede
                        deshacer.
                    </p>

                    <div class="flex justify-end gap-3 pt-3 border-t border-default">
                        <UButton color="neutral" variant="subtle" @click="cerrarConfirmBorrar">
                            Cancelar
                        </UButton>
                        <UButton color="error" icon="i-heroicons-trash" :loading="borrandoProducto"
                            @click="borrarProducto">
                            Borrar Producto
                        </UButton>
                    </div>
                </div>
            </template>
        </UModal>

    </div>
</template>