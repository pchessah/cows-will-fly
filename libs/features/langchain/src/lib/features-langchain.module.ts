import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { HttpClientModule }              from '@angular/common/http';
import { LangChainService }              from './langchain.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})

export class FeaturesLangchainModule {
  static forRoot(): ModuleWithProviders<FeaturesLangchainModule> {
    return {
      ngModule: FeaturesLangchainModule,
      providers:[LangChainService],
    }
  }
}
