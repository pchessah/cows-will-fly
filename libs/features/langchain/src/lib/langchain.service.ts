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


  async test(input:string){
    const key = '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';
    const model = new OpenAI({ openAIApiKey: key, temperature: 0.9 });
    const res = await model.call(
     input
    );
    alert(res);
  }
  
}