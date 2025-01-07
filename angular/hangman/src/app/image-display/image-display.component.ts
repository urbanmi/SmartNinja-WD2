import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-image-display',
    imports: [],
    templateUrl: './image-display.component.html',
    styleUrl: './image-display.component.css'
})


export class ImageDisplayComponent implements OnChanges {  
  	@Input({required:true}) steps:number = 10;
		alt = ''
	  	src = "" 

	ngOnChanges(): void {
		this.src = (10 -  this.steps) + '.jpg'
		this.alt = 'Guesses left ' + this.steps
	}
}