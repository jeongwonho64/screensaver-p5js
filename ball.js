
class Ball{
    constructor() {
        this.position = createVector(random(10, width-10), random(10, height-10));
        this.velocity = createVector(random(-4, 4), random(-4, 4));
        this.radius = 6 + noise(this.position.x, this.position.y) * 4;
        this.color = color(random(10,255), random(10,255), random(255));
        this.wallCollisionLength = 0;
    }
    checkCollision(other) {
        return collideCircleCircle(this.position.x, this.position.y, this.radius * 2 + 1, other.position.x, other.position.y, other.radius * 2 + 1);
    }
    checkEdges() {
        if (collideLineCircle(0, 4, width, 4, this.position.x, this.position.y, this.radius * 2) || collideLineCircle(0, height-4, width, height-4, this.position.x, this.position.y, this.radius * 2)) {
            this.velocity.y *= -1;
            this.wallCollisionLength += 1;
        }
        else if (collideLineCircle(4, 0, 4, height, this.position.x, this.position.y, this.radius * 2) || collideLineCircle(width-4, 0, width-4, height, this.position.x, this.position.y, this.radius * 2)) {
            this.velocity.x *= -1;
            this.wallCollisionLength += 1;
        }
        else{
            this.wallCollisionLength = 0;
        }
        if(this.wallCollisionLength > 10){
            this.position.x = random(10, width-10);
            this.position.y = random(10, height-10);
            this.velocity.x = random(-4, 4);
            this.velocity.y = random(-4, 4);
            this.wallCollisionLength = 0;
        }
        this.update();
    }
    collide(other) {    
        let thisMassMultiplier = 2*(this.radius*this.radius*this.radius) / (this.radius*this.radius*this.radius + other.radius*other.radius*other.radius);
        let otherMassMultiplier = 2*(other.radius*other.radius*other.radius) / (this.radius*this.radius*this.radius + other.radius*other.radius*other.radius);
        let thisPositionDelta = p5.Vector.sub(this.position, other.position);
        let otherPositionDelta = p5.Vector.sub(other.position, this.position);
        let thisVelocityDelta = p5.Vector.sub(this.velocity, other.velocity);
        let otherVelocityDelta = p5.Vector.sub(other.velocity, this.velocity);
        let thisVelocityChange = p5.Vector.mult(thisPositionDelta, thisVelocityDelta.dot(thisPositionDelta) / thisPositionDelta.magSq());
        let otherVelocityChange = p5.Vector.mult(otherPositionDelta, otherVelocityDelta.dot(otherPositionDelta) / otherPositionDelta.magSq());
        this.velocity.sub(p5.Vector.mult(thisVelocityChange, thisMassMultiplier));
        other.velocity.sub(p5.Vector.mult(otherVelocityChange, otherMassMultiplier));
        this.velocity.x += noise(this.position.x, this.position.y) * 0.1;
        this.velocity.y += noise(this.position.x, this.position.y) * 0.1;
        other.velocity.x += noise(other.position.x, other.position.y) * 0.1;
        other.velocity.y += noise(other.position.x, other.position.y) * 0.1;
    }
    update() {
        this.position.add(this.velocity);
    }
    show() {
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }
}