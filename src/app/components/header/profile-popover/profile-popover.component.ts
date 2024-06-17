import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

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

  constructor(private _eref: ElementRef) {}
}
