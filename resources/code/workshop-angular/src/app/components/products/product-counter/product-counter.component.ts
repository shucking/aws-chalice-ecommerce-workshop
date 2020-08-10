import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  template: `
  <div class="counter">
      <button class="btn btn-success" (click)="decrement()">-</button>
      <input type="number" [(ngModel)]="quantity" size="1" min="0" readonly>
      <button class="btn btn-success" (click)="increment()">+</button>
  </div>
  `,
  styleUrls: ['./product-counter.component.css']
})
export class ProductCounterComponent implements OnInit {
  @Input() quantity = 0;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  decrement() {
    if (this.quantity > 0){
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
