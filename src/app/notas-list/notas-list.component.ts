import { Component, OnInit, inject } from '@angular/core';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-notas-list',
  standalone: true,
  imports: [],
  templateUrl: './notas-list.component.html',
  styleUrl: './notas-list.component.css'
})
export default class NotasListComponent {

  private notasService = inject(NotasService);

  notas: any[] = [];

  ngOnInit(): void {
    this.notasService.list()
      .subscribe((notas: any) =>{
        console.log(notas);
        this.notas = notas;
      })
  }
}
