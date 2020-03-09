import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-dinosaure',
  templateUrl: './view-dinosaure.component.html',
  styleUrls: ['./view-dinosaure.component.css']
})
export class ViewDinosaureComponent implements OnInit {
  friend: any;
  dejafriend;
  dataSource: any;
  data: any;
  all_name: string[] = [];
  stop: boolean;
  friendOk: boolean;
  myControl = new FormControl();

  dataPost: any = { name: null, friend: null }
  dataPost2: any = { name: null, friend: null }
  dataNewFriend: any = { name: null, pw: null, age: '', famille: '', race: '', nourriture: '', ami_name: [] }

  constructor(private router: Router, ) { }

  ngOnInit() {
    this.fetch_get();
    this.stop = false;
  }

  ngDoCheck() {
    if (this.dataSource !== undefined) {
      this.dataSource.forEach(element => {
        if (element._id == localStorage.getItem('tokenid')) {
          this.data = element;
        }
      })
    }
    this.get_all_name();

  }

  logout_go() {
    this.router.navigate(['/login']);
  }

  get_all_name() {
    if (this.dataSource !== undefined && this.dataSource !== null && this.stop == false) {
      this.dataSource.forEach(element => {
        this.all_name.push(element.name);
      });
      this.stop = true;
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

  addFriend() {
    this.friendOk = false;
    this.dejafriend = false;

    if (this.friend == this.data.name) {
      this.dejafriend = true;
    }

    if (this.data.ami_name !== null) {
      this.data.ami_name.forEach(element => {
        if (element == this.friend) {
          this.dejafriend = true;
        }
      })
    }

    if (this.dejafriend) {
      if (this.friend == this.data.name) {
        alert("Can not add yourself");
      } else {
        alert("Already friend");
      }
    } else {

      if (this.friend !== null && this.friend !== undefined && this.data.ami_name !== null) {
        this.all_name.forEach(element => {
          if (element == this.friend) {
            this.friendOk = true;
          }
        })

        if (!this.friendOk) {
          this.dataNewFriend.name = this.friend;
          this.dataNewFriend.pw = this.friend;
          this.fetch_post_new_account(this.dataNewFriend);
        }

        this.fetch_post_ami(this.data.name, this.friend);
        this.fetch_post_ami(this.friend, this.data.name);
        this.fetch_get();
      }
    }
  }


  async fetch_post_ami(name, friend) {
    if (name !== null && friend !== null) {
      this.dataPost.name = name;
      this.dataPost.friend = friend;

      await fetch("http://localhost:3000/friend", {
        method: "POST",
        body: JSON.stringify(this.dataPost),
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

      this.fetch_get();
    }
  }

  deleteFriend(ami) {
    if (ami !== null && ami !== undefined) {
      this.fetch_delete_ami(this.data.name, ami);
      this.fetch_delete_ami(ami, this.data.name);
      this.fetch_get()
    }
  }

  async fetch_delete_ami(name, ami) {
    if (this.friend !== null && ami !== null) {
      this.dataPost.name = name;
      this.dataPost.friend = ami;

      await fetch("http://localhost:3000/remove", {
        method: "POST",
        body: JSON.stringify(this.dataPost),
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


      this.fetch_get();
    }
  }

  fetch_post_new_account(data) {
    fetch("http://localhost:3000/dinosaure", {
      method: "POST",
      body: JSON.stringify(data),
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


