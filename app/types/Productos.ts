import type { Categorias } from './Categoria'

export interface Productos {
  id: number
  nombre: string
  descripcion: string | null
  precio: number
  disponibilidad: number
  producto_visible: boolean
  imagen?: string 
  categoria_id?: number
  categoria?: Categorias
}