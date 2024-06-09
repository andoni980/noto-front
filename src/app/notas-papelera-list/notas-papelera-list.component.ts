import { Component, OnInit, inject } from '@angular/core';
import { NotasService } from '../services/notas.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Nota } from '../model/nota';

@Component({
  selector: 'app-notas-papelera-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './notas-papelera-list.component.html',
  styleUrls: ['./notas-papelera-list.component.css']
})
export default class NotasPapeleraListComponent implements OnInit {

  private notasService = inject(NotasService);

  notas: Nota[] = [];
  nota?: Nota = undefined;
  eliminadas: boolean = true;
  id: number = 0;

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.notasService.list(this.eliminadas)
      .subscribe(notas => {
        console.log(notas);
        this.notas = notas;
      })
  }

  restoreNote(nota: Nota){
    this.notasService.update(nota)
        .subscribe(() => {
          this.loadList();
        })
  }

  delete(id: number): void {
    this.notasService.delete(id)
      .subscribe(() => {
        this.notasService.list(this.eliminadas )
          .subscribe(notas => {
            console.log(notas);
            this.notas = notas;
          })
      })
  }

}
