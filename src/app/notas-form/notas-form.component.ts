import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-notas-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './notas-form.component.html',
  styleUrl: './notas-form.component.css'
})
export default class NotasFormComponent {

    private formBuilder = inject(FormBuilder);
    private router = inject(Router)
    private notasService = inject(NotasService);

    form = this.formBuilder.group({
        titulo: ['', [Validators.required]],
        texto: ['', [Validators.required]],
        categoria: this.formBuilder.group({
            id: ['', Validators.required]
        }),
        fechaCreacion:['', [Validators.required]]
    });

    create() {
        const nota = this.form.value;
         console.log(nota)
        this.notasService.create(nota)
          .subscribe(() => {
              this.router.navigate(['/']);
          })
    }
}
