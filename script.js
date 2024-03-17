// NUMBER GUESSING GAME

// Initializing the variables
let gameStart = false;
let performance = 0;
let number = 0;
let lives = 0;

let gameLevel = 'easy';
let scores = 0;
let numberOfWonGames = 0;
let numberOfLostGames = 0;





// 1- START GAME
function startGame() {

    // Retrieving Game Data
    retrieveGameData();

    // Update Level Menu
    updateLevelMenu(gameLevel);

    // clearInput
    document.querySelector('input[type="number"]').value = '';
    
    // Update Lives
    updateLives(gameLevel);


    // Update HINT para
    document.querySelector('.hint-para').innerHTML = `Here lies hints for your guesses.`

    // Reset Lives Box Borders
    resetLivesBoxBorder()
    
    
    // Update Score Box
    updateScoreBox(scores);


    // Calculate Performance
    calculatePerformance(numberOfWonGames, numberOfLostGames);

    // update Performance Box
    updatePerformanceSection(numberOfWonGames, numberOfLostGames, performance)

    // Generate Number
    number = Math.floor(Math.random() * 100 + 1);
    gameStart = true;

}



// 2- GAME LEVELS
// 2.1 Select Game Levels

const levels = document.querySelectorAll('.levels ul li');

levels.forEach((item, index, arr) => {
    item.addEventListener('click', (event) => {
        arr.forEach(item => item.classList.remove('select'))
        event.currentTarget.classList.add('select')

        // Updating Game Level
        gameLevel = event.currentTarget.innerText.toLowerCase();
        updateLives(gameLevel);
        startGame();
    })
})

// 2.2 Update Game Levels Menu
function updateLevelMenu(levelOfGame) {
    if(levelOfGame === 'easy') {
        levels.forEach(item => item.classList.remove('select'));
        levels[0].classList.add('select');
    } else if(levelOfGame === 'medium') {
        levels.forEach(item => item.classList.remove('select'));
        levels[1].classList.add('select');
    } else if(levelOfGame === 'hard') {
        levels.forEach(item => item.classList.remove('select'));
        levels[2].classList.add('select');
    }
}



// 3- GAME LIVES
// 3.1 Update Game Lives
function updateLives(gameLevel) {
    if (gameLevel === 'easy') {
        lives = 10;
    } else if (gameLevel === 'medium') {
        lives = 5;
    } else if (gameLevel === 'hard') {
        lives = 3;
    }

    storeGameData(gameLevel, scores, numberOfWonGames, numberOfLostGames);
    document.querySelector('.lives h3').innerText = lives.toString().padStart(2, '0');
}


// 3.2 Decrease Game Life
function decreaseLife() {
    --lives;

    document.querySelector('.lives h3').innerText = lives.toString().padStart(2, '0');
    if(lives === 0 && gameStart === true) {
        numberOfLostGames++;
        gameStart = false;
        storeGameData(gameLevel, scores, numberOfWonGames, numberOfLostGames);
        openLosePopup();
    }

    if(lives === 1) {
        turnRedLivesBoxBorder();
    }
}

// 3.3 Reset Game Lives Box Border
function resetLivesBoxBorder() {
    document.querySelector('.lives').style.border = `1px solid #636363`;
}

// 3.4 Make Red Game Lives Box Border
function turnRedLivesBoxBorder() {
    document.querySelector('.lives').style.border = `2px solid #ff0000`;
}


// 4- GUESS THE NUMBER
// 4.1 Guess The Number
function guessTheNumber(event) {
    event.preventDefault();

    if (lives > 0) {
        // Getting Guess Number
        const guess = Number.parseInt(document.querySelector('input[type="number"]').value);

        // Comparing and printing hint
        if (typeof guess === 'number') {
            if (guess === number) {
                document.querySelector('.hint-para').innerHTML = '';
                openWinPopup(number);
                gameStart = false;
                decreaseLife();
                numberOfWonGames++;
                calculateScore(gameLevel, lives);
                calculatePerformance(numberOfWonGames, numberOfLostGames);
                storeGameData(gameLevel, scores, numberOfWonGames, numberOfLostGames);
            } else if (guess < number) {
                document.querySelector('.hint-para').innerHTML = `Your Guess <span>${guess}</span> is LESS than the number to be guessed <span>Try Again.</span>`;
                decreaseLife();

            } else if (guess > number) {
                document.querySelector('.hint-para').innerHTML = `Your Guess <span>${guess}</span> is GREATER than the number to be guessed <span>Try Again.</span>`;
                decreaseLife();
            }
        } else {
            console.log('Error Occured : Type of guess is not number.')
        }
    } else {
        numberOfLostGames++;
        gameStart = false;
        storeGameData(gameLevel, scores, numberOfWonGames, numberOfLostGames);
        openLosePopup();
    }


}


// 5- POPUPS

// 5.1 Start Game Popup
document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.start-game').style.display = 'none'
    document.querySelector('.popup').style.display = 'none';
    startGame();
})


// 5.2 Game Resume Popup
// 5.2.1 Open
document.querySelector('.game-rules').addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.resume-game').style.display = 'block';
})

// 5.2.1 Close
document.querySelector('.resume').addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.resume-game').style.display = 'none'
})


// 5.3 Game Lose Popup
// 5.3.1 Open
function openLosePopup() {
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.lose-game').style.display = 'block'
}

// 5.3.1 close
document.querySelector('.try-again').addEventListener('click', ()=> {
    startGame();
    document.querySelector('.lose-game').style.display = 'none'
    document.querySelector('.popup').style.display = 'none';
})

// 5.4 Game Win Popup
// 5.4.1 Open
function openWinPopup(num) {

    document.querySelector('.guess-number').innerText = `${num.toString().padStart(2, '0')}`;
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.win-game').style.display = 'block'
}

// 5.4.1 Close
document.querySelector('.play-again').addEventListener('click', ()=> {
    startGame();
    document.querySelector('.win-game').style.display = 'none'
    document.querySelector('.popup').style.display = 'none';
})


// 6.0 CALCULATE SCORE
function calculateScore(currentLevel, remainingLives) {
    if(currentLevel === 'easy') {
        scores += (remainingLives * 10) + 10;
    } else if(currentLevel === 'medium') {
        scores += (remainingLives * 20) + 20;
    }else if(currentLevel === 'hard') {
        scores += (remainingLives * 33) + 34;
    }

    if(scores <= 999) {
        document.querySelector('.scores h3').innerText = scores.toString().padStart(2, '0');
    } else {
        const newScore = scores.toPrecision(2).toString().substring(0, 3);
        document.querySelector('.scores h3').innerText = `${newScore} K`;

    }
}

// 6.1 Update Score Box 
function updateScoreBox(myScores) {
    if(myScores <= 999) {
        document.querySelector('.scores h3').innerText = scores.toString().padStart(2, '0');
    } else {
        const newScore = myScores.toPrecision(2).toString().substring(0, 3);
        document.querySelector('.scores h3').innerText = `${newScore} K`;

    }
}


// 7.0 CALCULATE PERFORMANCE
function calculatePerformance(wonGames, lostGames) {
    if(wonGames === 0 && lostGames === 0) {
        performance = 0;
    } else {
        performance = (wonGames/(wonGames + lostGames)) * 100;
        updatePerformanceSection(wonGames, lostGames, performance);
    }
}

function updatePerformanceSection(wonGames, lostGames, performance) {
    document.querySelector('.won-games h4').innerText = wonGames;
    document.querySelector('.lose-games h4').innerText = lostGames;
    document.querySelector('.games-performance h4').innerText = `${Math.floor(performance).toString().padStart(2, '0')}%`;
}


// 8.0 SAVING &RETRIVING THE DATA FROM LOCAL STORAGE 

// 8.1 Store Game Data
function storeGameData(currentGameLevel, currentGameScore, wonGames, loseGames){
    
    const gameDate = {
        "gameLevel": currentGameLevel,
        "scores": currentGameScore,
        "numberOfWonGames": wonGames,
        "numberOfLostGames": loseGames
    }

    const stringGameData = JSON.stringify(gameDate);
    localStorage.setItem('guessTheNumberGameData', stringGameData);
    
}

// 8.2 Retrive Game Data
function retrieveGameData() {
    if(localStorage.getItem('guessTheNumberGameData')) {
        const stringGameData = localStorage.getItem('guessTheNumberGameData');
        const gameData = JSON.parse(stringGameData);

        gameLevel = gameData["gameLevel"];
        scores = gameData["scores"];
        numberOfWonGames = gameData["numberOfWonGames"];
        numberOfLostGames = gameData["numberOfLostGames"];
        
    } else {
        console.log('Data Not Found.')
    }


}