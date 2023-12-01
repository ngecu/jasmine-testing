import { Component } from '@angular/core';
import { Carousel, initTE } from 'tw-elements';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  constructor() { }

  ngOnInit() {
    
    initTE({ Carousel });
  }

}
