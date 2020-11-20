/* 
    -The game has 2 players, playing in rounds
    - In each rounds the player rolls the dice, as many times he wishes. Each results gets added to his score.
    - But, if the player rolls a 1, all his round score gets lost and comes to 0. After that it's the next player's turn.
    - The player can choose to hold, which means that his round score gets added to  his GLOBAL score. After that it's next player's turn.
    - The first player to reach 100 is the  winner of the game.
*/

var scores, roundScore, activePlayer, gamePlaying;
var lastDice;

init();


//textContent will return text content to the DOM element

//State Variable - tells us the condition of the system

//We are hiding the dice image at start


//we are adding click event on 'Roll Dice' 
//Function is called ASAP the event happens

document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Get a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        //First display the image
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score only IF the rolled number was not equal to 1
            if (dice === 6 && lastDice === 6) {
                //player loses score when two rolls are 6
                scores[activePlayer] = 0;
                document.querySelector('#score--' + activePlayer).textContent = '0';
                nextPlayer();
            } else if(dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }

        lastDice = dice;
    }
    

});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add CURRENT score to Global Score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    //Check if the player wins
    if(scores[activePlayer] >= 100) {
        document.querySelector('#name--' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player--0').classList.toggle('player--winner');
        gamePlaying = false;
    } else {
        //Next player
        nextPlayer();
    }
    }
})

function nextPlayer () {
      //Next player
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0;
  
      document.getElementById('current--0').textContent = '0';
      document.getElementById('current--1').textContent = '0';
  
  
      //Toggling class
      document.querySelector('.player--0').classList.toggle('player--active');
      document.querySelector('.player--1').classList.toggle('player--active');
  
      document.querySelector('.dice').style.display = 'none';
}


//here we are not passing anonymous function, but we tell the eventListener to call that function when that function is clicked. 
//So we just pass the declare the function instead of calling the function

//If we call the function it will be called immediately. 
document.querySelector('.btn--new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
}
