import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(private route: ActivatedRoute, private storage: Storage, private http: HttpClient, private router: Router) { this.storage.create() }

  id: any;
  token:string | null = null;
  is_admin:any | null = null;
  perfis = null;
  usuario_id:any;
  usuarioData = {
    name:'',
    email: '',
    password: '',
    profile_id:'',
    is_admin:0
  };

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadingStorage();
  }

  async loadingStorage() {
    this.token = await this.storage.get('token');
    this.is_admin = await this.storage.get('is_admin');
    this.usuario_id = await this.storage.get('usuario_id');
    if(!this.token){
      this.router.navigate(['']);
    }

    if(this.is_admin != 1 && this.usuario_id != this.id){
      this.router.navigate(['home']);
    }


    await this.buscarPerfis()
    if(this.id){
      await this.buscarUsuario();
    }
  }

  buscarPerfis(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get('http://127.0.0.1:8000/profiles', { headers }).subscribe(
      (response: any) => {
        if(this.is_admin != 1){
          this.perfis = response.data.filter((perfil:any) => perfil.id !== 1);
        }else{
          this.perfis = response.data;
        }

      },
      (error) => {

      }
    );
  }

  buscarUsuario(){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get('http://127.0.0.1:8000/users/'+this.id, { headers }).subscribe(
      (response: any) => {
        this.usuarioData = response.data;
      },
      (error) => {

      }
    );

  }


  salvarUsuario(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    const urldosistema = 'http://127.0.0.1:8000/users/';

    if(this.usuarioData.profile_id == '1'){
      this.usuarioData.is_admin = 1;
    }else{
      this.usuarioData.is_admin = 0;
    }

    if(this.id){
      this.http.put(urldosistema+this.id,this.usuarioData, { headers }).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
        },
        (error) => {

        }
      );
    }else{
      this.http.post(urldosistema,this.usuarioData, { headers }).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
        },
        (error) => {

        }
      );
    }
  }


}
