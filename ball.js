//the ball class
class Ball{
    constructor() {
        //create a ball with random position, velocity, radius, and color
        this.position = createVector(random(10, width-10), random(10, height-10));
        this.velocity = createVector(random(-4, 4), random(-4, 4));
        this.radius = 6 + noise(this.position.x, this.position.y) * 4;
        this.color = color(random(10,255), random(10,255), random(255));
        this.wallCollisionLength = 0;
    }
    checkCollision(other) {
        //check if this ball is colliding with another ball using the p5.collide2d library
        return collideCircleCircle(this.position.x, this.position.y, this.radius * 2 + 1, other.position.x, other.position.y, other.radius * 2 + 1);
    }
    checkEdges() {
        //check if the ball is colliding with the edges of the screen
        if (this.position.y < 4 || this.position.y > height - 4) {
            this.velocity.y *= -1;
            this.wallCollisionLength += 1;
        }
        else if (this.position.x < 4 || this.position.x > width - 4) {
            this.velocity.x *= -1;
            this.wallCollisionLength += 1;
        }
        else{
            this.wallCollisionLength = 0;
        }
        //if the ball is stuck in the wall, reset it
        if(this.wallCollisionLength > 10){
            this.reset();
        }
        this.update();
    }
    reset(){
        //reset the ball
        this.position = createVector(random(10, width-10), random(10, height-10));
        this.velocity = createVector(random(-4, 4), random(-4, 4));
        this.radius = 6 + noise(this.position.x, this.position.y) * 4;
        this.color = color(random(10,255), random(10,255), random(255));
        this.wallCollisionLength = 0;
    }
    collide(other) {
        //collide this ball with another ball. physics from https://en.wikipedia.org/wiki/Elastic_collision
        let thisMassMultiplier = 2*(this.radius**3) / (this.radius**3 + other.radius**3);
        let otherMassMultiplier = 2*(other.radius**3) / (this.radius**3 + other.radius**3);
        let thisPositionDelta = p5.Vector.sub(this.position, other.position);
        let otherPositionDelta = p5.Vector.sub(other.position, this.position);
        let thisVelocityDelta = p5.Vector.sub(this.velocity, other.velocity);
        let otherVelocityDelta = p5.Vector.sub(other.velocity, this.velocity);
        let thisVelocityChange = p5.Vector.mult(thisPositionDelta, thisVelocityDelta.dot(thisPositionDelta) / thisPositionDelta.magSq());
        let otherVelocityChange = p5.Vector.mult(otherPositionDelta, otherVelocityDelta.dot(otherPositionDelta) / otherPositionDelta.magSq());
        this.velocity.sub(p5.Vector.mult(thisVelocityChange, thisMassMultiplier));
        other.velocity.sub(p5.Vector.mult(otherVelocityChange, otherMassMultiplier));
        this.velocity.x += noise(this.position.x, this.position.y) * 0.01;
        this.velocity.y += noise(this.position.x, this.position.y) * 0.01;
        other.velocity.x += noise(other.position.x, other.position.y) * 0.01;
        other.velocity.y += noise(other.position.x, other.position.y) * 0.01;
    }
    update() {
        //update the ball's position
        this.position.add(this.velocity);
        this.position.x = constrain(this.position.x, 0, width);
        this.position.y = constrain(this.position.y, 0, height);
    }
    show() {
        //draw the ball
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }
}