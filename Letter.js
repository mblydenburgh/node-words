function Letter(char){
    this.hiddenCharacter = char;
    this.placeholder = `_`;
    this.guessed = false;
    
    this.displayCharacter = function(){
        return (this.guessed?this.hiddenCharacter:this.placeholder);
    };
    
    this.guessLetter = function(guess){
        (guess === this.hiddenCharacter)?this.guessed=true:this.guessed=false;
    };
}

module.exports = Letter;