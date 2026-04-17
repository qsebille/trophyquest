import {Component, computed, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly authService = inject(AuthService)

  currentUserName = computed(() => {
    const currentUser = this.authService.currentUser()
    return currentUser?.displayName ?? currentUser?.email;
  });

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.refreshCurrentUser();
    }
  }
}
