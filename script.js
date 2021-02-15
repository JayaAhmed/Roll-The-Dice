'use strict';

var scores, roundScore, activePlayer, gamePlaying;

init();
function init()
{
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');
}

//dice = Math.floor(Math.random() * 6) +1;

// document.querySelector('#current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score--0').textContent;
// console.log(x); // getter

document.querySelector('.btn--roll').addEventListener('click', function(){
    if(gamePlaying)
    {
        //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display th result 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the round score if the rolled number was not a 1
        if (dice>1) {
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore; // setter
        }
        else{
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn--hold').addEventListener('click', function(){
    if(gamePlaying)
    {
        //adding current score to global score
        scores[activePlayer] += roundScore;
            
        //update the UI 
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        //check if any player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name--' + activePlayer).textContent = '🥇Winner!!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        }
        else{
            //next player
            nextPlayer();
        }
    }
});


function nextPlayer(){
    // document.querySelector('.player--' + activePlayer).classList.remove('player--active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    // document.querySelector('.player--' + activePlayer).classList.add('player--active');

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    document.querySelector('.dice').style.display = 'none';    
}

document.querySelector('.btn--new').addEventListener('click', init);