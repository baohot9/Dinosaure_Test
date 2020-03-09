import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';

  constructor(private route: ActivatedRoute, private router: Router, ) {
  }

  login_go() {
    this.router.navigate(['/login']);
  }
}
