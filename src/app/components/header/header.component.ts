import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  popoverActive = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit(){
    this.authService.isAuthenticated.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn
    })
  }

  togglePopover(event: Event) {
    event.stopPropagation()
    this.popoverActive = !this.popoverActive;
  }
}
