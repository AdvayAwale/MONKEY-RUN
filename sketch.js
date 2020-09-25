  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var monkey, monkey_running,monkey_collided;
  var banana, bananaImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup;
  var survivalTime;
  var ground, groundImage;
  var invisibleGround;
  var score;
  

  function preload() {


        monkey_running = loadAnimation( "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

        monkey_collided = loadAnimation("sprite_0.png");

        bananaImage = loadImage("banana.png");
        obstacleImage = loadImage("obstacle.png");
        groundImage = loadImage("ground2.png");
       

      }



  function setup() {

    createCanvas(600, 350);
    
    monkey = createSprite(50, 325, 20, 20);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.1;
    monkey.addAnimation("collided",monkey_collided);


    ground = createSprite(590, 315, 900, 10);
    ground.addImage(groundImage);
    ground.velocityX = -10;
    ground.x = ground.width / 2;
    // console.log(ground.x);

    invisibleGround = createSprite(410, 330, 900, 10);
    invisibleGround.visible = false;

    survivalTime = 0;
    score = 0;
    
    
    FoodGroup = new Group();
    obstacleGroup = new Group();
  }


  function draw() {
    background("green");

    stroke("black");
    textSize(20);
    fill("black");
    text("Banana Score:" + score, 400, 50);


    stroke("black");
    textSize(20);
    fill("black");
    text("SURVIVAL TIME:" + survivalTime, 10, 50);


    //console.log(monkey.y);

    //add gravity



    monkey.collide(invisibleGround);




    if (gameState === PLAY) {
      if (keyDown("space") && monkey.y >= 289) {
          monkey.velocityY = -12;
      }
        monkey.velocityY = monkey.velocityY + 0.9;

      if (FoodGroup.isTouching(monkey)) {
          score = score + 1;
          FoodGroup.destroyEach();

      }
      if (ground.x < 0) {
          ground.x = ground.width / 2;
      }
      if (obstacleGroup.isTouching(monkey)) {
          gameState = END;
      }
      survivalTime = Math.ceil(frameCount / frameRate())

      Banana();
      Obstacles();

    }

    if (gameState === END) {
        ground.velocityX = 0;
        FoodGroup.setLifetimeEach(-1);
        obstacleGroup.setLifetimeEach(-1);

        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
      
      monkey.changeAnimation("collided",monkey_collided);


    }





    drawSprites();
  }

  function Banana() {
        if (frameCount % 200 === 0) {
              var banana = createSprite(500, 5, 40, 10);
              banana.y = Math.round(random(200, 250));
              banana.addImage(bananaImage);
              banana.scale = 0.1;
              banana.velocityX = -(10 + score / 2);

              //assign lifetime to the variable
              banana.lifetime = 200;


              //add each cloud to the group
              FoodGroup.add(banana);
            }
          }



  function Obstacles() {
        if (frameCount % 80 === 0) {
          var obstacles = createSprite(500, 5, 40, 10);
          obstacles.y = Math.round(random(300, 300));
          obstacles.addImage(obstacleImage);
          obstacles.scale = 0.1;
          obstacles.velocityX = -(10 + score / 2);

          //assign lifetime to the variable
          obstacles.lifetime = 200;

          obstacleGroup.add(obstacles);

        }
      }