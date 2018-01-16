import Template from './Template';
import Shot from './Shot';

export default class Player extends Template {
    constructor(game, size={width: 30, height: 10}, initialPosition) {
        initialPosition = initialPosition || { x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - 45 };

        super(game, size, initialPosition);

        this.speed = 3;
        this.fireDelay = 120;
        this.isFiring = false;
    }
    update() {
        let input = this.game.input;

        if( input.isLeftPressed() && this.position.x > 0 ) {
            this.position.x -= this.speed;
        }

        if( input.isRightPressed() && this.game.canvas.width > this.position.x + this.size.width ) {
            this.position.x += this.speed;
        }

        if( input.isActionPressed() && !this.isFiring ) {
            this.shoot();
        }
    }
    shoot() {
        this.game.addBody(new Shot(
            this.game,
            {x: this.position.x + this.size.width / 2, y: this.position.y - 5 },
            'up'
        ));

        this.isFiring = true;

        setTimeout(function () {
            this.isFiring = false;
        }.bind(this), this.fireDelay);
    }
}
