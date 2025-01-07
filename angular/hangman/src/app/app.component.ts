import { Component, contentChild, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { LetterPickerComponent } from './letter-picker/letter-picker.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ImageDisplayComponent, LetterPickerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'hangman';
    guessesLeft: number = 10;

	secretWord = this.selectSecretWord(); 
	missedLetters:string[] = [];
	hitLetters:string[] = [];
	hiddenWord = this.hideWord();
	gameStatus: 'playing' | 'won' | 'lost' = 'playing';
	isGameFinished:boolean = false;
	messageToPlayer:string = 'You are playing'
	
	selectSecretWord() {
		const words = ['area','book','business','case','child','company','country','day','eye','fact','family','government','group','hand','home','job','life','lot','man','money','month','mother','Mr','night','number','part','people','place','point','problem','program','question','right','room','school','state','story','student','study','system','thing','time','water','way','week','woman','word','work','world','year',]
		const randomItemId = Math.floor(words.length * Math.random());
		return words[randomItemId].toUpperCase();
	}

	hideWord() {
		let hidden = '';

		for (let char of this.secretWord.split('')) {
			if (this.hitLetters.includes(char)) {
				hidden += char;
			}
			else {
				hidden += '_';
			}
		}
		return hidden;
	}

	handleCharSelection(char:string) {
		if (this.secretWord.includes(char))
			{this.hitLetters.push(char)
			this.hiddenWord = this.hideWord()
			if (this.hiddenWord === this.secretWord){
				this.gameStatus = 'won'
				this.isGameFinished = true;
				this.messageToPlayer = 'You Have Won!';
				
		}}
		else{
			this.guessesLeft -= 1;
			this.missedLetters.push(char)
			this.hiddenWord = this.hideWord()
			if (this.guessesLeft == 0){
				this.gameStatus = 'lost'
				this.isGameFinished = true;	
				this.messageToPlayer = 'You Have Lost!';
			}
		}
		
	}
	buttonDisabler(state:string) {
		return state == 'won' || state == 'lost';
	}
		
		/*if (state == 'won' || state == 'lost') {
			console.log('true');
			return 'true';
		}
		if (state == 'playing') {
			console.log('false');
			return 'false'
		}
		else {
			console.log('false');
			return 'false'
		}
			
	}*/
	
}
