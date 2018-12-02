const Letter = require('./Letter');
const Word = require ('./Word');
const words = ["test","snake","two words"];

let randomIndex;

function chooseWord(arr){
    randomIndex = randomNumber(arr.length);
    return words[randomIndex];
}

function randomNumber(num){
    return Math.floor(Math.random()*num);
}

let word1 = new Word(chooseWord(words));
// word1.returnWord();
// word1.checkGuess('e');
// word1.returnWord();



// console.log(randomNumber(words.length));

// let letter1 = new Letter('a');

// console.log(letter1.displayCharacter());
// letter1.guessLetter('a');
// console.log(letter1.displayCharacter());