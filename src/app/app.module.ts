import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './workflow/header/header.component';
import { NodesComponent } from './nodes/nodes.component';
import { NodesHeaderComponent } from './nodes/nodes-header/nodes-header.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkflowComponent,
    NavbarComponent,
    HeaderComponent,
    NodesComponent,
    NodesHeaderComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
