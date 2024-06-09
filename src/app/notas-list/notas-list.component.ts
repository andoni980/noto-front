import { Component, OnInit, inject } from '@angular/core';
import { NotasService } from '../services/notas.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Nota } from '../model/nota';

@Component({
  selector: 'app-notas-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './notas-list.component.html',
  styleUrl: './notas-list.component.css'
})
export default class NotasListComponent implements OnInit {

  private notasService = inject(NotasService);

  notas: Nota[] = [];
  id: number = 0;

  ngOnInit(): void {
      this.loadList();
  }

  loadList() {
    this.notasService.list(false)
      .subscribe(notas => {
        console.log(notas);
        this.notas = notas;
      })
  }

  delete(id: number): void {
    this.notasService.delete(id)
        .subscribe(() => {
          this.notasService.list(false)
                .subscribe(notas => {
                console.log(notas);
                this.notas = notas;
      })
        })
  }
}
