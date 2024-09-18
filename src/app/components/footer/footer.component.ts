import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public url!:string;
  public hideAddButton:boolean = false;
  public isLoggedIn:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit(){
    this.authService.isAuthenticated.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if(url === '/edit-task' || url === '/add-task'){
          this.hideAddButton = true;
          setTimeout(() => {}, 200);
        }
      }
    });
  }

  onClick() {
    this.router.navigateByUrl('/add-task')
  }
}
