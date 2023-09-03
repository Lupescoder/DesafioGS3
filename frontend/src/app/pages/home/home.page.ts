import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private storage: Storage, private http: HttpClient,private navigation: NavController) { this.storage.create() }

  token:string | null = null;
  is_admin:any | null = null;
  perfis = null;
  usuarios = null;
  usuario_id:any;
  exibirPerfis: boolean = false;
  exibirUsuarios: boolean = false;


  ngOnInit() {
  }

  ionViewWillEnter(){
    this.exibirUsuarios = false;
    this.exibirPerfis = false;
    this.loadingStorage();
  }

  async loadingStorage() {
    this.token = await this.storage.get('token');
    this.is_admin = await this.storage.get('is_admin');
    this.usuario_id = await this.storage.get('usuario_id');
    if(!this.token){
      this.router.navigate(['']);
    }
  }

  logout() {
    this.storage.remove('profile_id');
    this.storage.remove('is_admin');
    this.storage.remove('token').then(() => {
      this.router.navigate(['']);
    });
  }

  buscarPerfis(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get('http://127.0.0.1:8000/profiles', { headers }).subscribe(
      (response: any) => {
        this.perfis = response.data;
        this.exibirPerfis = true;
        this.exibirUsuarios = false;
      },
      (error) => {

      }
    );
  }

  buscarUsuarios(){
    this.exibirPerfis = false;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get('http://127.0.0.1:8000/users', { headers }).subscribe(
      (response: any) => {
        this.usuarios = response.data;
        this.exibirUsuarios = true;
      },
      (error) => {

      }
    );

  }

  excluirPerfil(id:any){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.delete('http://127.0.0.1:8000/profiles/'+id, { headers }).subscribe(
      (response: any) => {
        this.buscarPerfis()
        this.router.navigate(['home']);
      },
      (error) => {

      }
    );
  }

  excluirUsuario(id:any){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.delete('http://127.0.0.1:8000/users/'+id, { headers }).subscribe(
      (response: any) => {
        this.buscarUsuarios();
        this.router.navigate(['home']);
      },
      (error) => {

      }
    );
  }


  criarUsuario(){
    this.router.navigate(['usuario']);
  }
  editarUsuario(id:any){
    this.navigation.navigateForward(`/usuario/${id}`);
  }


  criarPerfil(){
    this.router.navigate(['perfil']);
  }
  editarPerfil(id:any){
    this.navigation.navigateForward(`/perfil/${id}`);
  }

  dadosDaConta(){
    this.navigation.navigateForward(`/usuario/${this.usuario_id}`);
  }

}
