let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
const tamanhoSpan = document.querySelector('#placar');
let tamanho = 0;
let box = 32;
let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
}
let direction = "right";
let food = {
        x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

let jogo;

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

criarBG();

function novoJogo(){
    snake = [];
    snake[0] = {
        x: 7 * box,
        y: 7 * box
    };
    direction = "right";
    food = {
        x: Math.floor(Math.random() * 16) * box,
        y: Math.floor(Math.random() * 16) * box
    }
    tamanhoSpan.textContent = 0;
    tamanho = 0;
}

function criarCobrinha(){
    for(i=0;i< snake.length;i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y,box,box);
}

function fimdoJogo(){
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("fim do jogo!!");
            break;
        }
    }
}

document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right"; 
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){


    criarBG();
    drawFood();
    criarCobrinha();
    fimdoJogo();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left")  snakeX -= box;
    if(direction == "up")    snakeY -= box;
    if(direction == "down")  snakeY += box;

    if(snakeX > 15 * box && direction == "right") snakeX = 0;
    if(snakeX < 0 && direction == "left") snakeX = 15 * box;
    if(snakeY > 15 * box && direction == "down") snakeY = 0;
    if(snakeY < 0 && direction == "up") snakeY = 15 * box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 16) * box;
        food.y = Math.floor(Math.random() * 16) * box;
        tamanhoSpan.textContent = ++tamanho;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);


}
function start(){ 
    novoJogo();
    jogo = setInterval(iniciarJogo, 100);
    return 1;
}

