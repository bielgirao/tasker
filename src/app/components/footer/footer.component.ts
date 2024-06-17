import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public url!:string;
  public hideAddButton:boolean = false;


  constructor(private router: Router) {
  }

  ngOnInit(){
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
