import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotasService } from '../services/notas.service';
import { Nota } from '../model/nota';

@Component({
  selector: 'app-notas-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './notas-form.component.html',
  styleUrl: './notas-form.component.css'
})
export default class NotasFormComponent implements OnInit {

    private formBuilder = inject(FormBuilder);
    private router = inject(Router)
    private notasService = inject(NotasService);
    private route = inject(ActivatedRoute)

    form?: FormGroup;
    nota?: Nota;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if(id) {
            this.notasService.get(parseInt(id))
                .subscribe(nota => {
                    this.nota = nota;
                    this.form = this.formBuilder.group({
                      id: [nota.id],
                      titulo: [nota.titulo, [Validators.required]],
                      texto: [nota.texto, [Validators.required]],
                      categoria: this.formBuilder.group({
                        id: [nota.categoria.id, Validators.required]
                      }),
                      fechaCreacion: [nota.fechaCreacion, [Validators.required]]
                    });
                })
        } else {
          this.form = this.formBuilder.group({
            id: [''],
            titulo: ['', [Validators.required]],
            texto: ['', [Validators.required]],
            categoria: this.formBuilder.group({
              id: ['', Validators.required]
            }),
            fechaCreacion: ['', [Validators.required]]
          })
        }
    }

    save() {
        const notaForm = this.form!.value;

        if(this.nota) {
            this.notasService.update(notaForm)
              .subscribe(() => {
                  this.router.navigate(['/']);
              })

        }else {
            this.notasService.create(notaForm)
              .subscribe(() => {
                this.router.navigate(['/']);
              })
        }

    }
}
