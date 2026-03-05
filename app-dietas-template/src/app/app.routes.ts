
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { GridDietasComponent } from './components/griddietas/griddietas';
import { AltaDietaComponent } from './components/altadieta/altadieta';


export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'griddietas', component: GridDietasComponent },
  { path: 'altadieta', component: AltaDietaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
