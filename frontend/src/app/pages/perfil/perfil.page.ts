import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private route: ActivatedRoute, private storage: Storage, private http: HttpClient, private router: Router) { this.storage.create() }

  id: any;
  token:string | null = null;
  is_admin:any | null = null;
  perfilData = {
    name:''
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
    if(!this.token){
      this.router.navigate(['']);
    }

    if(this.is_admin != 1 ){
      this.router.navigate(['home']);
    }

    if(this.id){
      await this.buscarPerfil();
    }
  }

  salvarPerfil(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    const urldosistema = 'http://127.0.0.1:8000/profiles/';

    if(this.id){
      this.http.put(urldosistema+this.id,this.perfilData, { headers }).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
        },
        (error) => {

        }
      );
    }else{
      this.http.post(urldosistema,this.perfilData, { headers }).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
        },
        (error) => {

        }
      );
    }
  }

  buscarPerfil(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get('http://127.0.0.1:8000/profiles/'+this.id, { headers }).subscribe(
      (response: any) => {
        this.perfilData = response.data;
      },
      (error) => {

      }
    );
  }

}
