import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  livros: Livro[] = [];
  private livrosSubscription: Subscription;

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livros = this.livroService.getLivros();
    this.livrosSubscription = this.livroService.getListaDeLivrosAtualizadosObservable().subscribe(
      (livros: Livro[])=>{
        this.livros = livros;
      }
    )
  }
  ngOnDestroy(): void{
    this.livrosSubscription.unsubscribe();
  }
}
