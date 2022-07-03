import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth,signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginForm, RegisterForm } from '../types/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean=false;
  isLoading:boolean=false;
  password_matched:boolean=true;
  constructor(private router: Router) { }

  login(form: LoginForm){
    if(this.isLoading) return;
    this.isLoading=true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email,form.password)
    .then((userCredential) => {
      // Signed in 
      this.isAuthenticated=true;
      this.router.navigate(['']);
      //const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.isAuthenticated=false;
  }).finally(()=>(this.isLoading=false));
  }

  register(form: RegisterForm){
    if(this.isLoading) return;
    this.isLoading=true;
    if(form.password!=form.confirm_password){
      this.password_matched=false;
      this.isLoading=false
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => { 
      this.router.navigate(['login']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.isAuthenticated=false;
      // ..
    }).finally(()=>(this.isLoading=false));
  }
  
  logout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['login']);
      this.isAuthenticated=false;
    }).catch((error) => {
      // An error happened.
    });
  }
}
