import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-encuesta',
  imports: [ReactiveFormsModule,CommonModule],
  standalone: true,
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
    pregunta1: ['', Validators.required], // Radiobutton
    pregunta2: [[], Validators.required], // Checkbox
    pregunta3: ['', Validators.required], // Textarea
  });

  mensaje = '';

 enviar(){
  console.log('hola')
 }

 onCheck(event: any, controlName: string) {
  const selected = this.form.get(controlName)?.value || [];
  if (event.target.checked) {
    selected.push(event.target.value);
  } else {
    const index = selected.indexOf(event.target.value);
    if (index >= 0) selected.splice(index, 1);
  }
  this.form.get(controlName)?.setValue(selected);
}
}
