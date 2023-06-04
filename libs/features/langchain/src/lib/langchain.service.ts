import { Injectable } from '@angular/core';
import { OpenAI } from 'langchain';



@Injectable({providedIn: 'root'})

export class LangChainService {
  private executor: any;

  constructor() {
    this.initialize();
  }

  async initialize() {
 
  }


  async execute(input: string) {

  }

  
}