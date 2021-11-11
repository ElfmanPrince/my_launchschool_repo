const readline = require('readline-sync');
const WORD_CHOICES = {
  r: 'rock',
  p: 'paper',
  s: 'scissors',
  sp: 'spock',
  l: 'lizard'
};
const TRIES_LIMIT = 3;
const CHOICE_ENTRIES = Object.entries(WORD_CHOICES).reduce((acc, current) => {
  return acc.concat(current);
}, []);
const CHOICE_VALUES = Object.values(WORD_CHOICES);
let computerWins = 0;
let playerWins = 0;
let isWinner = false;

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function keepingScore() {
  console.log(`
   Player score: ${playerWins}
   Computer score: ${computerWins}
  `);
}

function charsToChooseFrom(arr, delimiter = ', ', word = 'or ') {
  return arr.slice(0, arr.length - 1).map(function (word, index, arr) {
    if (arr[index] === 'spock') return 'sp for spock';
    return `${word[0]} for ${arr[index]}`;
  }).join(delimiter) + `${delimiter}${word}${arr[arr.length - 1][0]} for ${arr.slice(-1)[0]}`;
}

function playerIsRoundWinner(choice, computerChoice) {
  return (choice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
  (choice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
  (choice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
  (choice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
  (choice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'));
}

function displayWinner(choice, computerChoice) {

  console.clear();

  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if (playerIsRoundWinner(choice, computerChoice)) {
    prompt('You win!');
    win('player');
    keepingScore();
  } else if (choice === computerChoice) {
    prompt('It\'s a tie');
    keepingScore();
  } else {
    prompt('Computer wins');
    win('computer');
    keepingScore();
  }
  checkForGrandWinner();
}

function win(winner) {
  if (winner === 'player') {
    playerWins++;
  } else if (winner === 'computer') {
    computerWins++;
  }
}

function checkForGrandWinner() {
  if (computerWins === 3) {
    prompt('Computer has won the game!');
    isWinner = true;
  } else if (playerWins === 3) {
    prompt('Player has won the game!');
    isWinner = true;
  }
}

function playAgain(answer) {
  const VALID_ANSWERS = {y: ['yes', 'yep', 'yeah', 'yup'], n: ['no', 'nope', 'nah', 'no way'] };
  const ANSWER_KEYS = Object.keys(VALID_ANSWERS);
  const ALLOWED_ANSWERS = Object.entries(VALID_ANSWERS).flat();
  let tries = 1;
  while (true) {
    if (VALID_ANSWERS['y'].includes(answer) || answer === ANSWER_KEYS[0]) {
      return true;
    } else if (VALID_ANSWERS['n'].includes(answer) || answer === ANSWER_KEYS[1]) {
      return false;
    } else if (!ALLOWED_ANSWERS.includes(answer)) {
      prompt('Please choose Y for yes or N for no');
      answer = readline.question().toLowerCase();
      tries++;
      if (!ALLOWED_ANSWERS.includes(answer) && tries === TRIES_LIMIT) {
        return false;
      }
    }
  }
}

console.clear();

prompt('Welcome to the game!');

while (true) {
  prompt(`Please, choose one of the following: 
  ${charsToChooseFrom(CHOICE_VALUES)}`);
  let choice = readline.question().toLowerCase();

  while (!CHOICE_ENTRIES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question().toLowerCase();
  }

  CHOICE_VALUES.includes(choice) ? choice : choice = WORD_CHOICES[choice];

  let randomIndex = Math.floor(Math.random() * (CHOICE_VALUES.length));
  let computerChoice = CHOICE_VALUES[randomIndex];

  displayWinner(choice, computerChoice);

  if (isWinner) {
    prompt('Do you want to play again? (y/n)');
    let answer = readline.question().toLowerCase();
    if (playAgain(answer)) {
      computerWins = 0;
      playerWins = 0;
      isWinner = false;
      console.clear();
      continue;
    } else {
      prompt('I hope you had fun. Thank you for playing');
      break;
    }
  }

}