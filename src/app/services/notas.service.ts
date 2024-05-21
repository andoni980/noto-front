import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private http = inject(HttpClient)

  list() {
    return this.http.get('http://localhost:8080/notas')
  }

  get(id: number) {
    return this.http.get(`http://localhost:8080/notas/${id}`);
  }

  create(nota: any) {
    return this.http.post(`http://localhost:8080/notas/save`, nota);
  }

  update(nota: any) {
    return this.http.put(`http://localhost:8080/notas/update`, nota);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8080/notas/${id}/delete`);
  }

}
