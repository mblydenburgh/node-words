const Letter = require('./Letter');

function Word(word){
    this.wordArray = word.split('').map(letter=>new Letter(letter));

    this.returnWord = function(){
        let letterArray = this.wordArray.map(letter=>{
            return letter.displayCharacter();
        }).join(' ');
        console.log(letterArray);
    }

    this.checkGuess = function(char){
        this.wordArray.map(letter=>letter.guessLetter(char));
    }
}

module.exports = Word;