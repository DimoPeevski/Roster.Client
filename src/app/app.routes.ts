import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/add-manager/register.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';
import { ErrorComponent } from './error/error.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ListEmployeesComponent, canActivate: [AuthGuard] },

  //Start - User routing
  { path: 'login', component: LoginComponent, canActivate: [] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //End- User routing

  //Start - Employee and manager routing
  {
    path: 'add-manager',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-employee',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delete-employee',
    component: DeleteEmployeeComponent,
    canActivate: [AuthGuard],
  },
  //End - Employee and manager routing

  //Start - Error 404 routing
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
  //End - Error 404 routing
];
