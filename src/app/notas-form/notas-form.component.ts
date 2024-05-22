import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotasService } from '../services/notas.service';

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

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if(id) {
            this.notasService.get(parseInt(id))
                .subscribe(nota => {
                    this.form = this.formBuilder.group({
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
            titulo: ['', [Validators.required]],
            texto: ['', [Validators.required]],
            categoria: this.formBuilder.group({
              id: ['', Validators.required]
            }),
            fechaCreacion: ['', [Validators.required]]
          })
        }
    }

    create() {
        const nota = this.form!.value;
         console.log(nota)
        this.notasService.create(nota)
          .subscribe(() => {
              this.router.navigate(['/']);
          })
    }
}
