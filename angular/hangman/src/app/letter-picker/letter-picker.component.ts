import { Component, output, input} from '@angular/core';

@Component({
  selector: 'app-letter-picker',
  imports: [],
  templateUrl: './letter-picker.component.html',
  styleUrl: './letter-picker.component.css'
})
export class LetterPickerComponent{
	selectLetters = output<string>();
	buttonState = input(false);
	letters = [
		'A', 'B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

	chooseCharacter(char:string) {
		this.letters = this.letters.filter(el => el !== char);
		this.selectLetters.emit(char);
		console.log(char);
		console.log(this.buttonState)
		}	
}