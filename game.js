const inquirer = require('inquirer');
const fs = require('fs');
const Word = require('./Word');

let words;
let randomIndex;
let guessedLetters = [];
let selectedWord;
let alreadyPlayed = false;
let currentWordState;
let lives;


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
    lives = 5;
    guessedLetters.length = 0;
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
    if (lives > 0) {
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
                        // ignore entries longer than 1 character
                        if (guess.length > 1) {
                            console.log(`Please enter 1 letter`);
                            promptGuess();
                        }
                        //user entered guess, initiate check
                        else {
                            console.log(`Guess: ${guess}`);
                            // if letter already guessed, ignore the guess and re-prompt
                            if (guessedLetters.includes(guess)) {
                                console.log(`Already guessed ${guess}`);
                                promptGuess();
                            }
                            // letter has not been guessed, run checkGuess on this letter and add
                            // the letter to the guessed array
                            else {
                                if (!words[randomIndex].includes(guess)) {
                                    console.log(`Incorrect guess, ${guess} is not in the word.`);
                                    --lives;
                                    console.log(`${lives} lives remaining.`);
                                }
                                selectedWord.checkGuess(guess);
                                guessedLetters.push(guess);
                                // display the current word state
                                selectedWord.returnWord();

                                // if the current word state is equal to the original chosen word, game
                                // has been won. restart and choose another word.
                                currentWordState = selectedWord.currentState();
                                if (currentWordState === words[randomIndex]) {
                                    console.log(`You Win!`);
                                    setTimeout(startGame, 3000)
                                }
                                // letters remain to be chosen, re-prompt for the next guess
                                else {
                                    promptGuess();
                                }
                            }
                        }
                }
            });
    }
    else {
        console.log(`Game Over, Thanks for playing!`);
        setTimeout(startGame, 3000);
    }

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
getData().then(function (response) {
    startGame();
});