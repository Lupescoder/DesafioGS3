import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login(){
    var email = $('#userEmail').val();
    var password = $('#userPassword').val();
    var dados = {'email':email,'password':password};
    $.ajax({
      type: "POST",
      data: dados,
      url: "http://127.0.0.1:8000/users/login",
      cache: true,
      success: function (data) {
        console.log(data)
        this.router.navigate(['home'])
      },
      error: function (data){
        console.log(data)
      },
      async: true
    });

  }
  registerPage(){
    this.router.navigate(['register'])
  }

}
