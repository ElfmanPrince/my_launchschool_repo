const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if ((choice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
      (choice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
      (choice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
      (choice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
      (choice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))) {
    prompt("You win!");
  } else if (choice === computerChoice) {
    prompt("It's a tie");
  } else {
    prompt("Computer win");
  }
}

while (true) {

  const CHAR_CHOICES = VALID_CHOICES.map(item => {
    if (item === 'spock') {
      return `${item[0]}${item[1]} for ${item}`;
    } else {
      return `${item[0]} for ${item}`;
    }
  });

  prompt(`Choose: ${CHAR_CHOICES.join(', ')}`);
  let choice = readline.question().toLocaleLowerCase();

  while (!['r', 'rock', 'p', 'paper', 's', 'scissors', 'sp', 'spock', 'l', 'lizard'].includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question().toLocaleLowerCase();
  }

  let randomIndex = Math.floor(Math.random() * (VALID_CHOICES.length));
  let computerChoice = VALID_CHOICES[randomIndex];

  switch (choice) {
    case 'r':
      choice = 'rock';
      break;
    case 'p':
      choice = 'paper';
      break;
    case 's':
      choice = 'scissors';
      break;
    case 'sp':
      choice = 'spock';
      break;
    case 'l':
      choice = 'lizard';
      break;
  }

  displayWinner(choice, computerChoice);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLocaleLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question().toLocaleLowerCase();
  }

  if (answer[0] === 'n') {
    break;
  }
}
