var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var car1Image,car2Image,car3Image,car4Image;
var track,ground;

function preload(){
  car1Image = loadImage("images/car1.png");
  car2Image = loadImage("images/car2.png");
  car3Image = loadImage("images/car3.png");
  car4Image = loadImage("images/car4.png");

  track = loadImage("images/track.jpg");
  ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }

  //for(var i = 0 ; i < player.rank ; i++){

  if(allPlayers !== undefined){
    text("rank : " + player.rank, displayWidth-100 , displayHeight*2);
  }
    //text(i + ":" +  player.name, displayWidth - 100 , i * 10);
  //}

}
