import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';
import { TabService } from './tab.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tabIndex]',
})
export class TabDirective implements OnInit {
  private _index!: number;

  constructor(
    private el: ElementRef,
    private tabService: TabService,
  ) {}

  get index(): number {
    return this._index;
  }
  @Input('tabIndex')
  set index(i: any) {
    // eslint-disable-next-line radix
    this._index = parseInt(i);
  }

  @HostListener('keydown', ['$event'])
  onInput(e: any): void {
    if (e.which === 13) {
      e.preventDefault();
      this.tabService.selectedInput.next(this.index + 1);
    }
  }

  ngOnInit(): void {
    this.tabService.selectedInput.subscribe(i => {
      if (i === this.index) {
        this.el.nativeElement.focus();
      }
    });
  }
}
