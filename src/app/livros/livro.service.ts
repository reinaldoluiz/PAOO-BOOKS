import {Injectable} from '@angular/core';
import {Livro} from './livro.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class LivroService
{
    private livros: Livro[] = [];
    private listaLivrosAtualizado = new Subject <Livro[]> ();

    constructor (private httpClient: HttpClient){

    }
//teste
    getLivros(): void
    {
      this.httpClient.get<{mensagem: string, livros: Livro[]}>('http://localhost:3000/api/livros').subscribe(
        (dados) => {
          this.livros = dados.livros;
          this.listaLivrosAtualizado.next([...this.livros])
        })
    }

    adicionarLivro( id: Number, titulo: string, autor: string,paginas: Number)
    {
      const livro: Livro =
      {
        id: id,
        titulo: titulo,
        autor: autor,
        paginas: paginas
      }
      this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/livros', livro).subscribe
      (
        (dados) => {
          this.livros.push(livro)
          this.listaLivrosAtualizado.next([...this.livros])
        }
      )
    }

  getListaDeLivrosAtualizadosObservable()
  {
    return this.listaLivrosAtualizado.asObservable();
  }
}
