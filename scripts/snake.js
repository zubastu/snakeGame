const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const gameField = new Image();
gameField.src = 'images/gameField.png';

const gameFood = new Image();
gameFood.src = 'images/gameFood.png';

let cell = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * cell,
    y: Math.floor((Math.random() * 15 + 3)) * cell,
}

let snake = [];
snake[0] = {
    x: 9 * cell,
    y: 10 * cell,
}
document.addEventListener('keydown', direction);

let dir;

function direction(e) {
    if (e.key === 'ArrowLeft' && dir != 'right') {
        dir = 'left';
    } else if (e.key === 'ArrowUp' && dir != 'down') {
        dir = 'up';
    } else if (e.key === 'ArrowRight' && dir != 'left') {
        dir = 'right';
    } else if (e.key === 'ArrowDown' && dir != 'up') {
        dir = 'down';
    }
}

function eatSelf(head, arrSnake){
    arrSnake.forEach((snakeCell)=>{
        if(head.x === snakeCell.x && head.y === snakeCell.y){
            clearInterval(game);
            showDefeat();
        }
    });
}


function drawGame(){
    context.drawImage( gameField, 0, 0 );
    context.drawImage( gameFood, food.x, food.y );

    for( let i = 0; i < snake.length; i++ ){
        context.fillStyle = i === 0 ? 'green' : 'gray';
        context.fillRect(snake[i].x, snake[i].y, cell, cell);
    }

    context.fillStyle = 'white';
    context.font = '50px Arial';
    context.fillText(score, cell * 2.5, cell * 2);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(dir === 'left') snakeX -= cell;
    if(dir === 'right') snakeX += cell;
    if(dir === 'up') snakeY -= cell;
    if(dir === 'down') snakeY += cell;



    if(snakeX === food.x && snakeY === food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * cell,
            y: Math.floor((Math.random() * 15 + 3)) * cell,
        };
    } else
        snake.pop();

    if(snakeX < cell || snakeX > cell * 17){
        clearInterval(game);
        showDefeat();
    }
    const newHead = {
        x: snakeX,
        y: snakeY,
    }
    eatSelf(newHead, snake);
    snake.unshift(newHead);
}
function showDefeat(){
    context.fillStyle = 'red';
    context.font = '30px Arial';
    context.fillText(`Game Over score:${score}`, cell * 5, cell * 10)
}
const game = setInterval(drawGame, 100);


