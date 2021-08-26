import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookingComponent } from './components/booking/booking.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: HeroImageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
