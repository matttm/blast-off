import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]'
})
export class PasswordToggleDirective {
  isVisible: boolean;

  constructor(private el: ElementRef) {
    this.isVisible = false;
    const parent = this.el.nativeElement.parentNode;
    const toggle = document.createElement('span');
    toggle.innerHTML = 'Show';
    toggle.addEventListener('click', () => {
      this.togglePasswordVisibility(toggle);
    });
    parent.appendChild(toggle);
  }

  private togglePasswordVisibility(toggle: HTMLElement): void {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.el.nativeElement.setAttribute('type', 'text');
      toggle.innerHTML = 'Hide';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      toggle.innerHTML = 'Show';
    }
  }
}
