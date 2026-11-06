import type { Productos } from './Productos'

export interface Categorias {
  id: number
  nombre: string
  descripcion: string 
  producto?: Productos[]
}