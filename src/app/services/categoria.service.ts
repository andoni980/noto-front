import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    private http = inject(HttpClient);

    list() {
      return this.http.get('http://localhost:8080/categorias');
    }
}
