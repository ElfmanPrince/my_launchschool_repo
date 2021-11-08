const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
let computerWins = 0;
let playerWins = 0;
let isWinner = false;

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function keepingScore(playerWins, computerWins) {
  console.log(`
   Player score: ${playerWins}
   Computer score: ${computerWins}
  `);
}

function charsToChooseFrom(arr, delimiter = ', ', word = 'or ') {
  return arr.slice(0, arr.length - 1).map(function (word, index, arr) {
    if (arr[index] === 'spock') return 'S for spock';
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
    prompt("You win!");
    win('player');
    keepingScore(playerWins, computerWins);
  } else if (choice === computerChoice) {
    prompt("It's a tie");
  } else {
    prompt("Computer wins");
    win('computer');
    keepingScore(playerWins, computerWins);
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
    prompt("Computer has won the game!");
    isWinner = true;
  } else if (playerWins === 3) {
    prompt("Player has won the game!");
    isWinner = true;
  }
}

function playAgain(answer) {
  answer = answer.trim();
  let tryAllowed = 1;
  while (true) {
    if (['y'].includes(answer[0].toLowerCase())) {
      return true;
    } else if (['n'].includes(answer[0].toLowerCase())) {
      return false;
    } else if (!['n', 'y'].includes(answer)) {
      prompt('Please choose Y for yes or N for no ');
      answer = readline.question().trim().toLowerCase();
      tryAllowed++;
      if (!['n', 'y'].includes(answer) && tryAllowed === 3) {
        return false;
      }
    }
  }
}

while (true) {

  prompt(`Choose one (Case-sensitivity): ${charsToChooseFrom(VALID_CHOICES)}`);
  let choice = readline.question()[0].trim();

  while (!['r', 'rock', 'p', 'paper', 's', 'scissors', 'S', 'spock', 'l', 'lizard'].includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question()[0].trim();
  }

  const WORDCHOICES = {
    r: 'rock',
    p: 'paper',
    s: 'scissors',
    S: 'spock',
    l: 'lizard'
  };

  choice = WORDCHOICES[choice];

  let randomIndex = Math.floor(Math.random() * (VALID_CHOICES.length));
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(choice, computerChoice);

  if (isWinner) {
    prompt('Do you want to play again?');
    let answer = readline.question().trim().toLowerCase();
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
