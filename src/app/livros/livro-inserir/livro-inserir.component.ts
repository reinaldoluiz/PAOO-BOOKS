import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent {

  constructor(private livroService: LivroService ) { }

  onAdicionarLivro(form: NgForm){
    if(form.invalid) return;
    this.livroService.adicionarLivro(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.paginas
    )
    form.resetForm();
  }

}
