import * as Vector from './vector';
console.log(Vector, Vector.add);

var image = new Image();
image.src = './pool_balls.png';

/** @class Ball
  * A class representing a pool ball.
  */
export default class Ball {
  constructor(number, position) {
    this.number = number;
    this.position = {x: position.x, y: position.y};
    this.angle = 0;
    this.velocity = {x:0, y:0};
    this.color = 'gray';
    this.pocketed = false;
    this.getPosition.bind(this);
    this.getVelocity.bind(this);
    this.setColor.bind(this);
  }

  getPosition() {
    return {
      x: this.position.x,
      y: this.position.y
    };
  }

  setVelocity(velocity) {
    this.velocity.x = velocity.x;
    this.velocity.y = velocity.y;
  }

  getVelocity() {
    return {
      x: this.velocity.x,
      y: this.velocity.y
    };
  }

  setColor(color) {
    this.color = color;
  }

  update() {
    this.position = Vector.add(this.position, this.velocity);

    if (this.position.x < 15 || this.position.x > 760 - 15) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 15 || this.position.y > 360 - 15) {
      this.velocity.y *= -1;
    }
  }

  render(ctx) {
    if(!this.pocketed){
      var sourceX = this.number % 4;
      var sourceY = Math.floor(this.number / 4);
      ctx.save();
      ctx.translate(-15, -15);
      ctx.rotate(this.angle);
      ctx.translate(this.position.x, this.position.y);
      ctx.drawImage(image,
        // Source Image
        sourceX * 160, sourceY * 160, 160, 160,
        // Destination Image
        0, 0, 30, 30
      );
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.arc(15,15,15,0,2*Math.PI);
      ctx.stroke();
      ctx.restore();
    }
  }
}
