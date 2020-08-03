import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  loginForm: FormGroup;
  constructor(private errorBar: MatSnackBar, private fb: FormBuilder, private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cEmail: ["", [Validators.required, Validators.email]],
      cPassword: ["", Validators.required],
      cType: ["", Validators.required]
    });
  }

  get fctrl() {
    return this.loginForm.controls;
  }

  login() {
    let clientPassword = this.fctrl['cPassword'].value;
    let clientEmail = this.fctrl['cEmail'].value;
    let clientType;
    switch (this.fctrl['cType'].value) {
      case "admin":
        clientType = "ADMINISTRATOR";
        break;
      case "company":
        clientType = "COMPANY";
        break;
      case "customer":
        clientType = "CUSTOMER";
        break;
      default:
        clientType = "NULL";
        break;
      }
      /**
       null values are placeholder for empty login inputs. this prevents the login url to contain multiple '/' in a row and cause an edge
       case of bad url that isnt accepted by hibernate to then return the bad login response entity. It throws a cross origins error that results in internal server error.
       */
      if (clientPassword == "" || clientEmail == "") {
      clientPassword = "null";
      clientEmail = "null";
    }

    this.service.login(clientEmail, clientPassword, clientType).subscribe(
      (tokenFromServer) => { sessionStorage.token = tokenFromServer;  this.router.navigate([this.fctrl['cType'].value]); this.service.loggedIn = sessionStorage.token != null; },
      (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  };



}
