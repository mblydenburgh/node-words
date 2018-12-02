const inquirer = require('inquirer');
const Letter = require('./Letter');
const Word = require ('./Word');
const words = ["test","snake","two words"];

let randomIndex;
let guessedLetters = [];
let selectedWord;
let alreadyPlayed = false;

function chooseWord(arr){
    randomIndex = randomNumber(arr.length);
    return words[randomIndex];
}

function randomNumber(num){
    return Math.floor(Math.random()*num);
}

// startGame is responsible for choosing the random word for the next round.
// if the value of alreadyPlayed is false, the initial welcome message will apear,
// otherwise a standard message for restarting another round will be shown.
function startGame(){
    if(!alreadyPlayed){
        console.log(`Welcome to word guess!`);
        alreadyPlayed = true;
    }
    else{
        console.log(`Round starting.`)
        console.log(`Selecting word....`);
    }
    selectedWord = new Word(chooseWord(words));
    setTimeout(()=>{promptGuess()},2000)
}

function promptGuess(){
    inquirer.prompt([
        {
            name:"userGuess",
            message:"Please guess a letter or type 'quit' to exit:"
        }
    ])
    .then(function(response){
        const {userGuess:guess} = response;
        switch (guess){
            case 'quit':
                console.log(`Thanks for coming!`);
                break;
            default:
                if(guess.length>1){
                    console.log(`Please enter 1 letter`);
                    promptGuess();
                }
                else{
                    console.log(`guess:${guess}`);
                    guessedLetters.push(guess);
                    console.log(`guessed: ${guessedLetters}`)
                    promptGuess();
                }
        }
    })
}

startGame();

// let word1 = new Word(chooseWord(words));
// word1.returnWord();
// word1.checkGuess('e');
// word1.returnWord();



// console.log(randomNumber(words.length));

// let letter1 = new Letter('a');

// console.log(letter1.displayCharacter());
// letter1.guessLetter('a');
// console.log(letter1.displayCharacter());