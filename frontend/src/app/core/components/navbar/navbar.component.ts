import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tq-navbar',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle,
    JsonPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(readonly authService: AuthService,) {
  }
}
