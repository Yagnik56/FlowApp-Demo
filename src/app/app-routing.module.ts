import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NodesComponent } from './nodes/nodes.component';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [
  { path: '', component: WorkflowComponent, canActivate: [AuthGuard]},
  { path: 'nodes', component: NodesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}