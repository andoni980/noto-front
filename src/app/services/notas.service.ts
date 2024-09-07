import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Nota } from '../model/nota';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private http = inject(HttpClient)

    list(eliminadas: boolean) {
    return this.http.get<Nota[]>(`http://localhost:8080/notas?eliminadas=${eliminadas}`);
  }

  getByTitulo(titulo: string){
    return this.http.get<Nota[]>(`http://localhost:8080/notas/titulo/${titulo}`);
  }

  get(id: number) {
    return this.http.get<Nota>(`http://localhost:8080/notas/${id}`);
  }

  getByCategoriaId(id: number) {
    return this.http.get<Nota[]>(`http://localhost:8080/notas/categoria/${id}`);
  }

  create(nota: Nota) {
    return this.http.post<Nota>(`http://localhost:8080/notas/save`, nota);
  }

  update(nota: Nota) {
    return this.http.put<Nota>(`http://localhost:8080/notas/update`, nota);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/notas/${id}/delete`);
  }

}
