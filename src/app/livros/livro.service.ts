import {Injectable} from '@angular/core';
import {Livro} from './livro.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from  "rxjs/operators";

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
      this.httpClient.get<{mensagem: string, livros: any}>('http://localhost:3000/api/livros')
      .pipe(map((dados)=>{
        return dados.livros.map((livro)=>{
          return {
            id: livro._id,
            titulo: livro.titulo,
            autor: livro.autor,
            paginas: livro.paginas
          }
        })
      }))
      .subscribe(
        (livros) => {
          this.livros = livros;
          this.listaLivrosAtualizado.next([...this.livros])
        })
    }

    adicionarLivro( titulo: string, autor: string,paginas: Number)
    {
      const livro: Livro =
      {
        id: null,
        titulo: titulo,
        autor: autor,
        paginas: paginas
      }
      this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/livros', livro).subscribe
      (
        (dados) => {
          livro.id = dados.id
          this.livros.push(livro)
          this.listaLivrosAtualizado.next([...this.livros])
        }
      )
    }

  getListaDeLivrosAtualizadosObservable()
  {
    return this.listaLivrosAtualizado.asObservable();
  }
  removerLivro(id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(()=>{
      this.livros = this.livros.filter((livro)=>{
        return livro.id !== id
      })
      this.listaLivrosAtualizado.next([...this.livros])
    })
  }
}
