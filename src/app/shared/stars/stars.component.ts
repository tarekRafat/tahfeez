import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent {
  @Input() starsNumber = 5;
  @Output() ratingHandler = new EventEmitter<number>();
  @Input() rating: number = 0;
  counter(i: number) {
    return new Array(i);
  }
  calculateRating(idx: number) {
    const starNumber = idx + 1;
    this.rating = starNumber;
    this.ratingHandler.emit(starNumber);
    console.log(`star number ${starNumber} clicked`);
  }
}
