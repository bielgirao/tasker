import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss']
})
export class ProfilePopoverComponent {
  @Input() popoverActive: boolean = false;
  @Output() closePopoverEmittter = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.closePopoverEmittter.emit();
    }
  }

  constructor(
    private _eref: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    this.closePopoverEmittter.emit();
    this.authService.logout();
  }

  async navigateTo(path: string) {
    this.closePopoverEmittter.emit();
    await this.router.navigate([path])
  }
}
