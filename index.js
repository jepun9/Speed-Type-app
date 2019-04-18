window.addEventListener('load', init);

let levels =
{
  easy: 5,
  medium: 3,
  hard: 1
};

//To change level
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;
let randomWords;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

/*
const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];
*/

//Initialize game
function init()
{
  //show number of seconds in UI
  seconds.innerHTML = currentLevel;
  //load word from array
  showWord(randomWords);
  //Start matching on word input
  wordInput.addEventListener('input', startMatch);
  //Call countdown every second
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkStatus, 50);
}

//Start match
function startMatch()
{
  if (matchWords())
  {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(randomWords);
    wordInput.value = '';
    score++;
  }
  if (score === -1)
  {
    scoreDisplay.innerHTML = 0;
  } else
  {
    scoreDisplay.innerHTML = score;
  }
}

//Match currentWord to wordInput
function matchWords()
{
  if (wordInput.value === currentWord.innerHTML)
  {
    message.innerHTML = "<span style='color: green;'>Correct!</span>";
    return true;
  } else
  {
    message.innerHTML = '';
    return false;
  }
}

/*
//Pick and show random words
function showWord(words)
{
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}
*/

//Generate random word using wordnik api
function showWord(randomWords)
{
  fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=1380d58b8b5c33325130c0e8f340be6bc6fba6f7bb65bfc6f')
  .then(function(response) {return response.json();})
  .then(function(json)
  {
    randomWords = json.word;
    //console.log(randomWords);
    currentWord.innerHTML = randomWords;
  });
}

//Countdown timer
function countdown()
{
  //Make sure time is not run Output
  if(time > 0)
  {
    //Decrement
    time--;
  } else if(time === 0)
  {
    //Game is over
    isPlaying = false;
  }
  //Show time
  timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus()
{
  if(!isPlaying && time === 0)
  {
    message.innerHTML = "<span style='color: red;'>Game Over!</span>";
    score = -1;
  }
}

document.getElementById("easy").addEventListener("click", easy);
document.getElementById("medium").addEventListener("click", medium);
document.getElementById("hard").addEventListener("click", hard);

function easy()
{
  if ( this.checked )
  {
    currentLevel = levels.easy;
    seconds.innerHTML = currentLevel;
  }
};

function medium()
{
  if ( this.checked )
  {
    currentLevel = levels.medium;
    seconds.innerHTML = currentLevel;
  }
};

function hard()
{
  if ( this.checked )
  {
    currentLevel = levels.hard;
    seconds.innerHTML = currentLevel;
  }
};
