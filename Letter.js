function Letter(char){
    this.hiddenCharacter = char;
    if(char === " "){
        this.placeholder = char
    }
    else{
        this.placeholder = `_`;
    }
    this.guessed = false;
    
    // the display character function will either return the slot's hidden character or its
    // placeholder value based on the guessed boolean.
    this.displayCharacter = function(){
        return (this.guessed?this.hiddenCharacter:this.placeholder);
    };
    
    this.guessLetter = function(guess){
        if(guess === this.hiddenCharacter){
            this.guessed = true;
            //return true;
        }
        //return false;
    };
}

module.exports = Letter;