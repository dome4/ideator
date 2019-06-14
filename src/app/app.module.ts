import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaSevenWsComponent } from './idea-seven-ws/idea-seven-ws.component';
import { IdeaService } from './shared/services/idea.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IdeaListComponent,
    IdeaSevenWsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [IdeaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
