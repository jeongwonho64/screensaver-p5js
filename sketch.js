let balls = [], ballcnt = 80;
let settingsImg, settingsOpen = false, exitSettings;
let ballcntSlider;
let settingWindowSize = 350;

function preload(){
    settingsImg = loadImage('assets/gear.png');
    exitSettings = loadImage('assets/close_window.png');
}

function setup(){
    createCanvas(windowWidth,windowHeight); 
    balls = [];
    for (let i = 0; i < ballcnt; i++) {
        balls.push(new Ball());
    }
}

function draw(){
    background(0);
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (balls[i].checkCollision(balls[j])) {
                balls[i].collide(balls[j]);
            }
        }
    }
    for(let i = 0; i < balls.length; i++){
        balls[i].checkEdges();
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].show();
    }
    tint(255,220);
    image(settingsImg, windowWidth*33/35, windowHeight/75, windowHeight*7/75, windowHeight*7/75);
    if(settingsOpen){
        displaySettings();
    }
}

function displaySettings(){
    rectMode(CENTER);
    fill("#E8C7C8");
    rect(windowWidth/2, windowHeight/2, settingWindowSize, settingWindowSize,20);
    tint(255,255);
    image(exitSettings, windowWidth/2 + settingWindowSize/2 - 45, windowHeight/2 - settingWindowSize/2 - 5 , 50, 50);
    textFont('Inconsolata');
    textSize(20);
    textAlign(CENTER);
    fill(0);    
    text('Number of Balls', windowWidth/2, windowHeight/2 - settingWindowSize/2 + 20);
    ballcnt = ballcntSlider.value();
    text(ballcnt, windowWidth/2, windowHeight/2 - settingWindowSize/2 + 60);
}