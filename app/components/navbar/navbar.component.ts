import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isopen:boolean = false;

  constructor(private authser:AuthenticationService) { }

  ngOnInit() {
  }
  togglenavbar(){
    this.isopen = !this.isopen
  }
  signOut(){
    this.authser.signout();
  }
}
