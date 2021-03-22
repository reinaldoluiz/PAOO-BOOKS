import {Injectable} from '@angular/core';
import {Livro} from './livro.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LivroService
  {
    private livros: Livro[] = [];
    private listaLivrosAtualizado = new Subject <Livro[]> ();

    getLivros(): Livro[]{
        return [...this.livros];
    }

    adicionarLivro( id: Number, titulo: string, autor: string,paginas: Number){
      const livro: Livro = {
        id: id,
        titulo: titulo,
        autor: autor,
        paginas: paginas
      }
      this.livros.push(livro);
      this.listaLivrosAtualizado.next([...this.livros]);
  }
  getListaDeLivrosAtualizadosObservable()
  {
    return this.listaLivrosAtualizado.asObservable();
  }
}
