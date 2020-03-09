import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logout: boolean = false;

  name: string;
  password: string;
  dataSource: any;
  tmp: any = null;
  ecran: string

  constructor(private router: Router, ) { }

  login(name: any, pw: any) {

    if (this.dataSource !== undefined) {
      this.dataSource.forEach(element => {
        if (element.name == name && element.pw == pw) {
          this.tmp = element;
        }
      });
    }

    if (this.tmp != null) {
      this.logout = true;
      localStorage.setItem("token", "dfgrhgeerweu123");
      localStorage.setItem("tokenid", this.tmp._id);
      this.router.navigate(['/view']);
    } else {
      alert("Unknown username or wrong password");
      localStorage.setItem("token", null);
    }
  }

  logoutFunction() {
    localStorage.setItem("token", null);
    localStorage.setItem("tokenid", null);
    this.logout = false;
  }

  cancelFunction() {
    this.router.navigate(['/view']);
  }

  registerFunction() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    this.fetch_get();

    if (localStorage.getItem('token') === 'dfgrhgeerweu123') {
      this.logout = true;
    } else {
      localStorage.setItem("token", null);
      this.logout = false;
    }
  }

  fetch_get() {
    fetch("http://localhost:3000/dinosaure", {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => {
        this.dataSource = data;
      })
  }

}
