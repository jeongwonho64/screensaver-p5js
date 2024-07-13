let balls = [];
function setup(){
    createCanvas(windowWidth,windowHeight);
    for (let i = 0; i < 75; i++) {
        balls.push(new Ball());
    }
}

function draw(){
    background(0);
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (balls[i].checkCollision(balls[j])) {
                balls[i].collide(balls[j]);
                balls[i].update();
                balls[j].update();  
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
}