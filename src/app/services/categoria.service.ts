import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    private http = inject(HttpClient);

    list() {
      return this.http.get<Categoria[]>('http://localhost:8080/categorias');
    }
}
