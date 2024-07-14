let balls = [], ballcnt = 80;
let settingsImg, settingsOpen = false, exitSettings;
let ballcntSlider,backgroundColorPicker,backgroundColor = [0,0,0];
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
    background(backgroundColor);
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
function mousePressed(){
    if(!settingsOpen && mouseX > windowWidth*33/35 && mouseX < windowWidth*33/35 + windowHeight*7/75 && mouseY > windowHeight/75 && mouseY < windowHeight/75 + windowHeight*7/75){
        settingsOpen = true;
        ballcntSlider = createSlider(5, 120, ballcnt,5);
        ballcntSlider.position(windowWidth/2 - 350/2 + 50, windowHeight/2 - 350/2 + 30);
        ballcntSlider.style('width','250px');
        backgroundColorPicker = createColorPicker(color(backgroundColor[0],backgroundColor[1],backgroundColor[2]));
        backgroundColorPicker.position(windowWidth/2 - 350/2 + 50, windowHeight/2 - 350/2 + 100);
        backgroundColorPicker.style('width','250px');
    }
    if(settingsOpen && dist(mouseX, mouseY, windowWidth/2 + settingWindowSize/2 - 45 + 50/2, windowHeight/2 - settingWindowSize/2 - 5 + 50/2) < 50/2 + 5){
        settingsOpen = false;
        ballcntSlider.remove();
        backgroundColorPicker.remove();
        setup();
    }
}
function displaySettings(){
    rectMode(CENTER);
    fill("#E8C7C8");
    rect(windowWidth/2, windowHeight/2, settingWindowSize, settingWindowSize,20);
    tint(255,255);
    image(exitSettings, windowWidth/2 + settingWindowSize/2 - 45, windowHeight/2 - settingWindowSize/2 - 5 , 50, 50);
    createBallSlider();
    createBackgroundColorPicker();
}
function createBallSlider(){
    textFont('Inconsolata');
    textSize(20);
    textAlign(CENTER);
    fill(0);    
    text('Number of Balls', windowWidth/2, windowHeight/2 - settingWindowSize/2 + 20);
    ballcnt = ballcntSlider.value();
    text(ballcnt, windowWidth/2, windowHeight/2 - settingWindowSize/2 + 60);
}
function createBackgroundColorPicker(){
    textFont('Inconsolata');
    textSize(20);
    textAlign(CENTER);
    fill(0);    
    text('Background Color', windowWidth/2, windowHeight/2 - settingWindowSize/2 + 90);
    backgroundColor = backgroundColorPicker.color();
}