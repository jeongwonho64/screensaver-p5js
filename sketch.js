//set variables for the canvas and the balls
let balls = [], ballcnt = 80,prevBallcnt = 80;
let settingsImg, settingsOpen = false, exitSettings;
let ballcntSlider,backgroundColorPicker,backgroundColor = [0,0,0];
let settingWindowSize = 330;

function preload(){
    //load the settings icon and the exit icon 
    settingsImg = loadImage('assets/gear.png');
    exitSettings = loadImage('assets/close_window.png');
}

function setup(){
    //create the canvas and the balls
    createCanvas(windowWidth,windowHeight);
    balls = [];
    for (let i = 0; i < ballcnt; i++) {
        balls.push(new Ball());
    }
}

function draw(){
    //draw the background and the balls
    background(backgroundColor);
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            //check if the balls are colliding, O(n^2) complexity
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
    //draw the settings icon, semi-transparent
    tint(255,220);
    image(settingsImg, windowWidth*33/35, windowHeight/75, windowHeight*7/75, windowHeight*7/75);
    if(settingsOpen){
        displaySettings();
    }
}
function mousePressed(){
    //if the settings icon is pressed, open the settings and create the sliders
    if(!settingsOpen && mouseX > windowWidth*33/35 && mouseX < windowWidth*33/35 + windowHeight*7/75 && mouseY > windowHeight/75 && mouseY < windowHeight/75 + windowHeight*7/75){
        settingsOpen = true;
        ballcntSlider = createSlider(5, 120, ballcnt,5);
        ballcntSlider.position(windowWidth/2 - 350/2 + 50, windowHeight/2 - 350/2 + 100);
        ballcntSlider.style('width','250px');
        backgroundColorPicker = createColorPicker(backgroundColor);
        backgroundColorPicker.position(windowWidth/2 - 350/2 + 50, windowHeight/2 - 350/2 + 220);
        backgroundColorPicker.style('width','250px');
    }
    //if the exit icon is pressed, close the settings and remove the sliders
    if(settingsOpen && dist(mouseX, mouseY, windowWidth/2 + settingWindowSize/2 - 45 + 50/2, windowHeight/2 - settingWindowSize/2 - 5 + 50/2) < 50/2 + 5){
        settingsOpen = false;
        ballcntSlider.remove();
        backgroundColorPicker.remove();
        if(ballcnt != prevBallcnt){
            setup();
        }
        prevBallcnt = ballcnt;
    }
}
function displaySettings(){
    //display the settings
    rectMode(CENTER);
    fill("#E8C7C8");
    rect(windowWidth/2, windowHeight/2, settingWindowSize, settingWindowSize,20);
    tint(255,255);
    image(exitSettings, windowWidth/2 + settingWindowSize/2 - 45, windowHeight/2 - settingWindowSize/2 - 5 , 50, 50);
    createBallSlider();
    createBackgroundColorPicker();
}
function createBallSlider(){
    //create the slider for the number of balls with the text
    textFont('Inconsolata');
    textSize(20);
    textAlign(CENTER);
    fill(0);    
    text('Number of Balls', windowWidth/2, windowHeight/2 - settingWindowSize/2 + 80);
    ballcnt = ballcntSlider.value();
    text(ballcnt, windowWidth/2, windowHeight/2 - settingWindowSize/2 + 120);
}
function createBackgroundColorPicker(){
    //create the color picker for the background color with the text
    textFont('Inconsolata');
    textSize(20);
    textAlign(CENTER);
    fill(0);    
    text('Background Color', windowWidth/2, windowHeight/2 - settingWindowSize/2 + 200);
    backgroundColor = backgroundColorPicker.color();
}