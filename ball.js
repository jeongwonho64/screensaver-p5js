
class Ball{
    constructor() {
        this.position = createVector(random(5, width), random(5, height));
        this.velocity = createVector(random(-4, 4), random(-4, 4));
        this.radius = 6 + noise(this.position.x, this.position.y) * 4;
        this.color = color(random(10,255), random(10,255), random(255));
    }
    checkCollision(other) {
        return collideCircleCircle(this.position.x, this.position.y, this.radius * 2, other.position.x, other.position.y, other.radius * 2);
    }
    checkEdges() {
        if (collideLineCircle(0, 0, width, 0, this.position.x, this.position.y, this.radius * 2)) {
            this.velocity.y *= -1;
        }
        if (collideLineCircle(0, 0, 0, height, this.position.x, this.position.y, this.radius * 2)) {
            this.velocity.x *= -1;
        }
        if (collideLineCircle(width, 0, width, height, this.position.x, this.position.y, this.radius * 2)) {
            this.velocity.x *= -1;
        }
        if (collideLineCircle(0, height, width, height, this.position.x, this.position.y, this.radius * 2)) {
            this.velocity.y *= -1;
        }
        this.update();
    }
    show() {
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }
}