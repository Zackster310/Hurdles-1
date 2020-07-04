class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,100,50,50);
    //car1.addImage("car1",car1Image);

    car2 = createSprite(100,300,50,50);
    //car2.addImage("car2",car2Image);

    car3 = createSprite(100,500,50,50);
    //car3.addImage("car3",car3Image);

    car4 = createSprite(100,700,50,50);
    //car4.addImage("car4",car4Image);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getRank();
    
    if(allPlayers !== undefined){

      background("lightblue");

      //image(track , 0 , -displayHeight*4 , displayWidth , displayHeight*5)

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 150;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){

          fill("red");
          ellipse(cars[index-1].x , cars[index-1].y , 65 , 100);

          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null && player.distance < 4100){
      player.distance += -10
      player.update();
    }

    if(player.distance >= 4100){
      player.rank += 1;
      
      Player.updateRank(player.rank);

      gameState = 2;
    }

    drawSprites();
  }

  end(){
    console.log(player.rank);

    //player.getRank();

    //for(var i = 0 ; i < player.rank ; i++){
     // console.log("hi");
      //text(player.rank,displayWidth-100,10)
      //text(i + ":" +  player.name, displayWidth - 100 , i * 10);
    //}

    //game.update(2);
  }

}
