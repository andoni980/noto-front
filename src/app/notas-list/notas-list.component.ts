import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Nota } from '../model/nota';
import { NotasService } from '../services/notas.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-notas-list',
  standalone: true,
  imports: [DatePipe, RouterModule, ReactiveFormsModule, MatIconModule],
  providers: [NotasListComponent],
  templateUrl: './notas-list.component.html',
  styleUrl: './notas-list.component.css',
})
export default class NotasListComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private notasService = inject(NotasService);

  form!: FormGroup;
  notas: Nota[] = [];
  id: number = 0;
  eliminadas: boolean = false;
  titulo: string = '';

  ngOnInit(): void {
    this.loadList();
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required]],
    });
  }

  loadList() {
    this.notasService.list(this.eliminadas).subscribe((notas) => {
      console.log(notas);
      this.notas = notas;
    });
  }

  delete(id: number): void {
    this.notasService.delete(id).subscribe(() => {
      this.notasService.list(false).subscribe((notas) => {
        console.log(notas);
        this.notas = notas;
      });
    });
  }

  findByTitulo() {
    if (this.titulo != '') {
      this.notasService.getByTitulo(this.titulo).subscribe((notas) => {
        console.log(this.titulo);
        this.notas = notas;
      });
    } else {
      this.loadList();
    }
  }
}
