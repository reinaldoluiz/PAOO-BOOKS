import { Component } from '@angular/core';

import {Component}from 'angular/core';

@Component(
  {
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ["./cliente-inserir.component.css"]
  })
export class ClienteInserirComponent
{
  nome: string;
  email: string;
  fone: string;
  onAdicionarCliente(){
    console.log("Adicionando cliente");
  }
}
