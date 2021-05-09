import { Livro } from './../livro.model';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LivroService } from '../livro.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string
  public livro: Livro
  public estaCarregando: boolean = false
  constructor(private livroService: LivroService,
    public route: ActivatedRoute


  ) { }

  ngOnInit(): void{
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has("idLivro")){
        this.modo = "editar"
        this.idLivro = paramMap.get('idLivro')
        this.estaCarregando = true
        this.livroService.getLivro(this.idLivro).subscribe(dadosLiv =>{
          this.estaCarregando = false
          this.livro = {
            id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            autor: dadosLiv.autor,
            paginas: dadosLiv.paginas

          }
        })
      }else{
        this.modo = "criar"
        this.idLivro = null
      }
    })
  }

  onSalvarLivro(form: NgForm){
    if(form.invalid) return;
    this.estaCarregando = true
    if(this.modo === 'criar'){
      this.livroService.adicionarLivro(
      form.value.titulo,
      form.value.autor,
      form.value.paginas
    )}else{
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.paginas
      )}
    form.resetForm();
  }

}
