import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private http: HttpClient, private storage: Storage ) {  this.storage.create();  }

  ngOnInit() {

  }
  login(){
    // this.router.navigate(['home'])

    this.http.post('http://127.0.0.1:8000/users/login', this.loginData).subscribe(
      (response: any) => {
        const token = response.token;
        this.storage.set('profile_id', response.user.profile_id);
        this.storage.set('is_admin', response.user.is_admin);
        this.storage.set('usuario_id', response.user.id);
        this.storage.set('token', token).then(() => {
          this.router.navigate(['home']);
        });
      },
      (error) => {
        console.error('Erro de autenticação:', error);
      }
    );

  }

}
