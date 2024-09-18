import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss']
})
export class ProfilePopoverComponent {
  @Input() popoverActive: boolean = false;
  @Output() clickOutside = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }

  constructor(
    private _eref: ElementRef,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async logout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully.', undefined, {duration: 3000});
    await this.router.navigate(['/login']);
  }

}
