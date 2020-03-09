import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch-api',
  templateUrl: './fetch-api.component.html',
  styleUrls: ['./fetch-api.component.css']
})
export class FetchApiComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'pw', 'age', 'famille', 'race', 'nourriture'];

  dataSource: any;
  data: any = {
    "id": 10,
    "name": "test",
    "pw": "test123",
    "age": "100",
    "famille ": "Saurischiens ",
    "race": "100",
    "nourriture": "Carnivore"
  };

  constructor() {

  }

  ngOnInit() {
    this.fetch_get();
    this.fetch_post();
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
        console.log(data)
        this.dataSource = data;
      })
  }

  fetch_post() {
    fetch("http://localhost:3000/dinosaure", {
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

      return response.text()
    }, function (error) {
      error.message //=> String
    })
  }
}
