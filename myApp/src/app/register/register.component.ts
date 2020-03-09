import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: any = { name: null, pw: null, age: null, famille: null, race: null, nourriture: null, ami_name: [] }

  constructor(private router: Router, ) { }

  ngOnInit() {
  }

  cancelFunction() {
    this.router.navigate(['/login']);
  }

  async fetch_post() {
    let check = true;

    await fetch("http://localhost:3000/dinosaure", {
      method: "POST",
      body: JSON.stringify(this.data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then(function (response) {
      response.status     //=> number 100–599
      
      response.statusText //=> String
      response.headers    //=> Headers
      response.url        //=> String

      if (response.status == 409) {
        alert("User exists");
        check = false;
      } 
      return response.text()
    }, function (error) {
      error.message //=> String
    });

    if (check){
      this.router.navigate(['/login']); 
    }     
  }

}
