import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },

  //Start - User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  //End- User routing

  //Start - Employee and manager routing
  { path: 'add-manager', component: AddEmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee', component: EditEmployeeComponent },
  { path: 'delete-employee', component: DeleteEmployeeComponent },
  //End - Employee and manager routing

  //Start - Error 404 routing
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
  //End - Error 404 routing
];
