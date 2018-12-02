const inquirer = require('inquirer');
const fs = require('fs');
const Letter = require('./Letter');
const Word = require('./Word');
// const words = ["test","snake","two words"];

let words;
let randomIndex;
let guessedLetters = [];
let selectedWord;
let alreadyPlayed = false;
let currentWordState;
let lives = 5;

// fs.readFile('wordlist.txt','utf-8',function(error,data){
//     if(error){
//         console.log(error);
//     }
//     console.log(data);
//     words = data.split('\n');
// });
// console.log(words);

function chooseWord(arr) {
    randomIndex = randomNumber(arr.length);
    return words[randomIndex];
}

function randomNumber(num) {
    return Math.floor(Math.random() * num);
}

// startGame is responsible for choosing the random word for the next round.
// if the value of alreadyPlayed is false, the initial welcome message will apear,
// otherwise a standard message for restarting another round will be shown.
function startGame() {
    if (!alreadyPlayed) {
        console.log(`Welcome to word guess!`);
        alreadyPlayed = true;
    }
    else {
        console.log(`Round starting.`)
        console.log(`Selecting word....`);
    }
    selectedWord = new Word(chooseWord(words));
    setTimeout(() => { promptGuess() }, 2000)
    selectedWord.returnWord();
}

function promptGuess() {
    inquirer.prompt([
        {
            name: "userGuess",
            message: "Please guess a letter or type 'quit' to exit:"
        }
    ])
        .then(function (response) {
            const { userGuess: guess } = response;
            switch (guess) {
                case 'quit':
                    console.log(`Thanks for coming!`);
                    break;
                default:
                    if (guess.length > 1) {
                        console.log(`Please enter 1 letter`);
                        promptGuess();
                    }
                    else {
                        console.log(`Guess: ${guess}`);
                        if (guessedLetters.includes(guess)) {
                            console.log(`Already guessed ${guess}`);
                            promptGuess();
                        }
                        else {
                            selectedWord.checkGuess(guess);
                            guessedLetters.push(guess);
                            selectedWord.returnWord();
                            currentWordState = selectedWord.currentState();
                            if (currentWordState === words[randomIndex]) {
                                console.log(`You Win!`);
                                setTimeout(startGame, 3000)
                            }
                            else {
                                promptGuess();
                            }
                        }
                    }
            }
        })
}

function getData() {
    return new Promise(function (resolve, reject) {
        fs.readFile('wordlist.txt', 'utf-8', function (error, data) {
            if (error) {
                reject(err);
            }
            resolve(words = data.split('\n'));
        });
    });
}

// get list of words from wordlist.txt
getData().then(function(response){
    startGame();
});