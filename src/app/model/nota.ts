import { Categoria } from "./categoria";

export interface Nota {
    id: number;
    titulo: string;
    texto: string;
    categoria: Categoria;
    fechaCreacion: string;
    fechaEliminacion: string;
}
