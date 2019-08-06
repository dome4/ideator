import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaSevenWsComponent } from './data-grid/idea-seven-ws/idea-seven-ws.component';
import { IdeaService } from './services/idea.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { HeaderComponent } from './header/header.component';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IdeaEffects } from './store/effects/idea.effects';
import { CustomSlicePipe } from './pipes/custom-slice.pipe';
import { DataGridComponent } from './data-grid/data-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    IdeaListComponent,
    IdeaSevenWsComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    CustomSlicePipe,
    DataGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      AuthEffects,
      IdeaEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    }),
  ],
  providers: [
    IdeaService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
