import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  constructor(private errorBar: MatSnackBar, private admin: AdminService) { }

  ngOnInit(): void {
    this.admin.ping().subscribe(() => { }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

}
