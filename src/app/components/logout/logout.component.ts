import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private errorBar: MatSnackBar, public service: LoginService) { }

  ngOnInit(): void {

  }


  logout() {
    if (sessionStorage.token != null) {
      this.service.logout().subscribe((logout) => { sessionStorage.clear(); this.service.loggedIn = sessionStorage.token != null; }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); })
    }
  }



}
